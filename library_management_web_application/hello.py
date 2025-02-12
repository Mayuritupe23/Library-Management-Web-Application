import frappe
def print_hello():
    
    frappe.log_error("This is a test error message", "Test Error")
    frappe.log("Hello")
