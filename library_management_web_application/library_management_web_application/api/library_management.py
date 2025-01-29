import frappe

@frappe.whitelist()
def mark_as_returned(book_id, member_id):
    transaction = frappe.get_all(
        'Transactions',
        filters={
            'book_id': book_id,
            'member_id': member_id,
            'status': 'Issued'
        },
        fields=['name']
    )

    if not transaction:
        return {'success': False, 'message': 'No issued book found.'}

    transaction_name = transaction[0]['name']

    doc = frappe.get_doc('Transactions', transaction_name)
    doc.status = 'Returned'
    doc.return_date = frappe.utils.nowdate()
    doc.save()

    frappe.db.commit()
    return {'success': True, 'message': 'Book returned successfully.'}
