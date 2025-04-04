import requests
import frappe
import json
from library_management_web_application.__init__ import __version__

class hns_utils: 
    g_my_app_version = __version__

    @staticmethod
    def add_global_headers(response):
        response.headers["X-Erpnext-Version"] = hns_utils.g_my_app_version
        return response

    @staticmethod
    def check_version():

        api_url = "http://braininfotech.com/sysControl/apis/versions/app_name/ERPNext"
        headers = {
            "is-api-call": "true",
            "api-auth-user": "pragnatech",
            "api-auth-pwd": "pragnatech123"
        }

        try:
            response = requests.get(api_url, headers=headers)
            data = response.json()

            if response.status_code == 401:
                return {"status": "error", "message": data.get("usr_msg", "Unauthorized Access")}

            if response.status_code != 200:
                return {"status": "error", "message": data.get("usr_msg", "Bad Request")}

            api_version = data.get("data", [{}])[0].get("version_no", "")

            if api_version != hns_utils.g_my_app_version:
                return {"status": "error", "message": f'Version mismatch: Expected {hns_utils.g_my_app_version}, but got {api_version}'}

        except Exception as e:
            return {"status": "error", "message": str(e)}

def add_global_headers(response):
    return hns_utils.add_global_headers(response)

def check_version_hook(doc, method):
    version_result = hns_utils.check_version()
    if version_result:
        frappe.msgprint(version_result.get("message"))

