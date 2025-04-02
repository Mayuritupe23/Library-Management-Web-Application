# import frappe
# from library_management_web_application.utils import compare_app_version

# @frappe.whitelist()
# def check_version():
#     return compare_app_version()
import frappe
from library_management_web_application.public.utils import hns_utils

@frappe.whitelist(allow_guest=True)
def get_version():
    utils = hns_utils()
    response = frappe._dict()
    response = utils.add_global_headers(response)
    return response
