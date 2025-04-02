from .utils import check_version
import frappe
@frappe.whitelist(allow_guest=True)
def version_check():
    result=check_version()

    return result
    
    