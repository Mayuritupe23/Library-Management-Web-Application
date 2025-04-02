import requests
import frappe
import json
from library_management_web_application.__init__  import __version__


class hns_utils:
    def __init__(self):
        self.g_my_app_version = __version__ 
        

    def add_global_headers(self,response):
        response.headers["X-Erpnext-Version"] = self.g_my_app_version
        return response

    # @frappe.whitelist(allow_guest=True)
    def check_version(self):

        self.m_client_version = frappe.request.headers.get("X-Erpnext-Version", "Unknown")

           
        api_url = "http://braininfotech.com/sysControl/apis/versions/app_name/ERPNext"
        headers = {
            "is-api-call": "true",
            "api-auth-user": "pragnatech",
            "api-auth-pwd": "pragnatech123"
        }

        try:
            response = requests.get(api_url,headers=headers)
            data = response.json()

            if response.status_code == 401:
                return {
                    "status": "error",
                    "message": data.get("usr_msg", "Unauthorized Access")
                }

            if response.status_code != 200:
                return {"status": "error", "message": data.get("usr_msg", "Bad Request")}

            api_version = data.get("data", [{}])[0].get("version_no", "")
            frappe.msgprint(f'api_version:{api_version}, my_api_version:{self.g_my_app_version}')

            if api_version == self.m_client_version:
                return {"status": "success", "message": "Version matches"}
            else:
                return {"status": "errors", "message": f'Version mismatch.{self.g_my_app_version}, api version:{api_version}' } 

        except Exception as e:
            return {"status": "error", "message": str(e)}

def add_global_headers(response):
    return hns_utils().add_global_headers(response)
