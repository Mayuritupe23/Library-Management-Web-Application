import requests
import frappe
from library_management_web_application.__init__ import g_app_version, g_app_name

class hns_utils: 
    


    @staticmethod
    def add_global_headers(response):
        response.headers["X-App-Version"] = g_app_version
        response.headers["X-App-Name"] = g_app_name
        return response

    @staticmethod
    def execute_sys_api(add_on_url):
        api_url = f"http://braininfotech.com/sysControl/apis/{add_on_url}"
        
        headers = {
            "is-api-call": "true",
            "api-auth-user": "pragnatech",
            "api-auth-pwd": "pragnatech123"
        }
        return requests.get(api_url, headers=headers)

    @staticmethod
    def check_version():

        try:
            response = hns_utils.execute_sys_api(f"versions/app_name/{g_app_name}")
            data=(response.json())

            

            if response.status_code == 401:
                return {"status": "error", "message": data.get("usr_msg", "Unauthorized Access")}

            if response.status_code != 200:
                return {"status": "error", "message": data.get("usr_msg", "Bad Request")}

            api_version = data.get("data", [{}])[0].get("version_no", "")
            # frappe.msgprint(str(api_version))
            if int(api_version) != int(g_app_version):
                return {"status": "error", "message": f'Version mismatch for app "{g_app_name}": Expected {g_app_version}, but got {api_version}'}

        except Exception as e:
            return {"status": "error", "message": str(e)}

def add_global_headers(response):
    return hns_utils.add_global_headers(response)
def execute_sys_api(add_on_url):
    return hns_utils.execute_sys_api(add_on_url)

def check_version_hook(doc,method):
    version_result = hns_utils.check_version()
    if version_result:
        frappe.msgprint(version_result.get("message"))

