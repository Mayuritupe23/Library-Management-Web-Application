import requests
import frappe

@frappe.whitelist()
def import_books(page=1):
    """Fetch books from external API and create records in Frappe"""
    try:
        # External API endpoint
        url = f"https://frappe.io/api/method/frappe-library?page={page}"
        
        # Fetch data from external API
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for HTTP errors
        data = response.json().get("message", [])

        if not data:
            frappe.throw("No books found on this page.")

        # Insert books into Frappe DocType
        for book in data:
            if not frappe.db.exists("Books", {"isbn": book["isbn"]}):  # Avoid duplicates
                frappe.get_doc({
                    "doctype": "Books",
                    "title": book["title"],
                    "author": book["authors"],
                    "isbn": book["isbn"],
                    "publisher": book["publisher"],
                    "number_of_pages": book["num_pages"]
                }).insert(ignore_permissions=True)
        
        return f"Successfully imported {len(data)} books from page {page}."

    except requests.exceptions.RequestException as e:
        frappe.throw(f"Error fetching data from API: {e}")
    except Exception as e:
        frappe.throw(f"An error occurred: {e}")
