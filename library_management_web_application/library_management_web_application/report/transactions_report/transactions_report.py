from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, date_diff

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {"fieldname": "name", "label": _("Transaction ID"), "fieldtype": "Link", "options": "Transactions", "width": 120},
        {"fieldname": "member", "label": _("Member"), "fieldtype": "Link", "options": "Members", "width": 120},
        {"fieldname": "member_id", "label": _("Member ID"), "fieldtype": "Data", "width": 100},
        {"fieldname": "book", "label": _("Book"), "fieldtype": "Link", "options": "Books", "width": 120},
        {"fieldname": "book_id", "label": _("Book ID"), "fieldtype": "Data", "width": 100},
        {"fieldname": "issue_date", "label": _("Issue Date"), "fieldtype": "Date", "width": 100},
        {"fieldname": "due_date", "label": _("Due Date"), "fieldtype": "Date", "width": 100},
        {"fieldname": "return_date", "label": _("Return Date"), "fieldtype": "Date", "width": 100},
        {"fieldname": "status", "label": _("Status"), "fieldtype": "Select", "width": 100},
        {"fieldname": "rent_fee", "label": _("Rent Fee (₹)"), "fieldtype": "Currency", "width": 100},
        {"fieldname": "late_fine", "label": _("Late Fine (₹)"), "fieldtype": "Currency", "width": 100},
        {"fieldname": "days_overdue", "label": _("Days Overdue"), "fieldtype": "Int", "width": 100}
    ]

def get_data(filters):
    conditions = get_conditions(filters)
    transactions = frappe.db.sql("""
        SELECT 
            name, member, member_id, book, book_id,
            issue_date, due_date, return_date, status,
            rent_fee, late_fine
        FROM `tabTransactions`
        WHERE {conditions}
        ORDER BY issue_date DESC
    """.format(conditions=conditions), filters, as_dict=1)
    
    # Calculate days overdue
    for t in transactions:
        t["days_overdue"] = calculate_days_overdue(t)
    
    return transactions

def calculate_days_overdue(transaction):
    if transaction.status != "Returned":
        return max(0, date_diff(getdate(), transaction.due_date))
    elif transaction.return_date:
        return max(0, date_diff(transaction.return_date, transaction.due_date))
    return 0

def get_conditions(filters):
    conditions = "1=1"
    if filters.get("member"): conditions += " AND member = %(member)s"
    if filters.get("book"): conditions += " AND book = %(book)s"
    if filters.get("status"): conditions += " AND status = %(status)s"
    if filters.get("from_date"): conditions += " AND issue_date >= %(from_date)s"
    if filters.get("to_date"): conditions += " AND issue_date <= %(to_date)s"
    return conditions