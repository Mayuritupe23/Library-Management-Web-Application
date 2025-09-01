from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, date_diff

def execute(filters=None):
    # Step 1: Set Filters
    conditions = get_conditions(filters)
    
    # Step 2: SQL Query with member names
    sql_query = """
        SELECT 
            a.name as transaction_id,
            a.member,
            m.full_name as member_name,
            m.member_id,
            a.book,
            b.title as book_title,
            a.book_id,
            a.issue_date,
            a.due_date,
            a.return_date,
            a.status,
            a.rent_fee,
            a.late_fine,
            DATEDIFF(IFNULL(a.return_date, CURDATE()), a.due_date) as days_overdue,
            b.author as book_author
        FROM `tabTransactions` a
        LEFT JOIN `tabBooks` b ON a.book = b.name
        LEFT JOIN `tabMembers` m ON a.member = m.name
        WHERE 1=1 {conditions}
        ORDER BY a.issue_date DESC
    """.format(conditions=conditions)
    
    report_data = frappe.db.sql(sql_query, filters, as_dict=True)
    
    # Step 3: Generate Columns
    columns = [
        set_df_column("transaction_id", "ID", "Link", "left", 120, options="Transactions"),
        set_df_column("member_name", "Member Name", "Data", "left", 180),
        set_df_column("member_id", "Member ID", "Data", "left", 100),
        set_df_column("book_title", "Book Title", "Data", "left", 200),
        set_df_column("book_id", "Book ID", "Data", "left", 100),
        set_df_column("issue_date", "Issued On", "Date", "left", 100),
        set_df_column("due_date", "Due Date", "Date", "left", 100),
        set_df_column("days_overdue", "Days Overdue", "Int", "center", 100),
        set_df_column("status", "Status", "Select", "left", 100),
        set_df_column("late_fine", "Fine (₹)", "Currency", "right", 100)
    ]
    
    # Add detailed columns if requested
    if filters.get("report_type") == "detailed":
        columns.extend([
            set_df_column("return_date", "Returned On", "Date", "left", 100),
            set_df_column("rent_fee", "Rent Fee (₹)", "Currency", "right", 100),
            set_df_column("book_author", "Author", "Data", "left", 150)
        ])
    
    # Step 4: Group data if needed
    if filters.get("group_by") == "member":
        report_data = group_by_member(report_data)
    
    return columns, report_data

def set_df_column(fieldname, label, fieldtype, align, width, precision=0, options='', total=0):
    return {
        "fieldname": fieldname,
        "label": _(label),
        "fieldtype": fieldtype,
        "align": align,
        "width": width,
        "precision": precision,
        "options": options,
        "total": total
    }

def get_conditions(filters):
    conditions = ""
    
    # Member filter (multi-select)
    if filters.get("members"):
        members = ", ".join([f"'{m}'" for m in filters.get("members")])
        conditions += f" AND a.member IN ({members})"
    
    # Book filter
    if filters.get("book"):
        conditions += " AND a.book = %(book)s"
    
    # Status filter
    if filters.get("status"):
        conditions += " AND a.status = %(status)s"
    
    # Date range
    if filters.get("from_date"):
        conditions += " AND a.issue_date >= %(from_date)s"
    if filters.get("to_date"):
        conditions += " AND a.issue_date <= %(to_date)s"
    
    return conditions

def group_by_member(data):
    grouped_data = {}
    for row in data:
        if row.member not in grouped_data:
            grouped_data[row.member] = {
                "member_name": row.member_name,
                "member_id": row.member_id,
                "total_books": 0,
                "total_fine": 0,
                "indent": 0
            }
        grouped_data[row.member]["total_books"] += 1
        grouped_data[row.member]["total_fine"] += (row.late_fine or 0)
    
    # Convert to list and add totals
    result = list(grouped_data.values())
    if result:
        result.append({
            "member_name": "<strong>TOTAL</strong>",
            "total_books": sum(d["total_books"] for d in result),
            "total_fine": sum(d["total_fine"] for d in result),
            "indent": 0
        })
    return result