

import requests
import frappe
# @frappe.whitelist(allow_guest=True)

def get_context(context):
    # Fetching all members from the Member DocType
    context.members = frappe.get_all(
        'Members', 
        fields=['full_name','member_id', 'email','outstanding_debt' , 'phone_number']
    )

# def get_context(context):
    # Fetching all members from the Member DocType
    context.books = frappe.get_all(
        'Books', 
        fields=['title','book_id','name','isbn','stock_quantity', 'author', 'publisher']
    )
    context.issued_books = frappe.get_all(
        'Transactions', 
        filters={"Status":"Issued"},
        fields=['member.full_name','book.title','name','issue_date','due_date', 'return_date','status','member_id','book_id','rent_fee']
    )
    context.return_books = frappe.get_all(
        'Transactions', 
        filters={"Status":"Returned"},
        fields=['member.full_name','fine','book.title','issue_date','due_date', 'return_date','status','member_id','book_id','rent_fee']
     )

