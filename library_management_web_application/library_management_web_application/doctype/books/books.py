import frappe
# @frappe.whitelist()
# def import_books():
#     api_url = "https://frappe.io/api/method/frappe-library?page=1"

#     try:
#         response = requests.get(api_url)
#         if response.status_code == 200:
#             data = response.json().get("message", [])
            
#             # Log the response to see if it's correct
#             frappe.msgprint(f"API Response: {data}")
            
#             imported_count = 0

#             for record in data[:20]:  # Import only 20 books
#                 # Check if the book already exists based on ISBN
#                 if not frappe.db.exists("Books", {"isbn": record.get("isbn")}):
#                     book = frappe.get_doc({
#                         "doctype": "Books",
#                         "title": record.get("title"),
#                         "authors": record.get("authors"),
#                         "isbn": record.get("isbn"),
#                         "publisher": record.get("publisher"),
#                         "num_pages": record.get("num_pages"),
#                     })
#                     book.insert()
#                     frappe.db.commit()  # Commit the changes
#                     imported_count += 1
#                     # Log each book insert
#                     frappe.msgprint(f"Book Imported: {record.get('title')}")
                    
#             return f"{imported_count} books imported successfully!"
#         else:
#             return "Failed to fetch books from the API. Please try again."

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "Books Import Error")
#         return f"An error occurred: {str(e)}"
from frappe.model.document import Document

class Books(Document):
    pass
