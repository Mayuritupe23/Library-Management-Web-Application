app_name = "library_management_web_application"
app_title = "Library Management Web Application"
app_publisher = "Mayuri Tupe"
app_description = "A Frappe app to manage books, members, and library transactions efficiently"
app_email = "mayuritupe23@navgurukul.org"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "library_management_web_application",
# 		"logo": "/assets/library_management_web_application/logo.png",
# 		"title": "Library Management Web Application",
# 		"route": "/library_management_web_application",
# 		"has_permission": "library_management_web_application.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/library_management_web_application/css/library_management_web_application.css"
# app_include_js = "/assets/library_management_web_application/js/library_management_web_application.js"

# include js, css files in header of web template
# web_include_css = "/assets/library_management_web_application/css/library_management_web_application.css"
# web_include_js = "/assets/library_management_web_application/js/library_management_web_application.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "library_management_web_application/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Books" : "public/js/books_list.js"}
# doctype_list_js = {"Books" : "public/js/books_list.js"}
  
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "library_management_web_application/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "library_management_web_application.utils.jinja_methods",
# 	"filters": "library_management_web_application.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "library_management_web_application.install.before_install"
# after_install = "library_management_web_application.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "library_management_web_application.uninstall.before_uninstall"
# after_uninstall = "library_management_web_application.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "library_management_web_application.utils.before_app_install"
# after_app_install = "library_management_web_application.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "library_management_web_application.utils.before_app_uninstall"
# after_app_uninstall = "library_management_web_application.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "library_management_web_application.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
# 	"all": [
# 		"library_management_web_application.tasks.all"
# 	],
# 	"daily": [
# 		"library_management_web_application.tasks.daily"
# 	],
# 	"hourly": [
# 		"library_management_web_application.tasks.hourly"
# 	],
# 	"weekly": [
# 		"library_management_web_application.tasks.weekly"
# 	],
	# "monthly": [
	# 	"library_management_web_application.hello.print_hello"
	# ],

	"cron": {
		"58 10 * * *": [
			"library_management_web_application.hello.print_hello"
		]
	}
}

# Testing
# -------

# before_tests = "library_management_web_application.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "library_management_web_application.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "library_management_web_application.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["library_management_web_application.utils.before_request"]
# after_request = ["library_management_web_application.utils.after_request"]

# Job Events
# ----------
# before_job = ["library_management_web_application.utils.before_job"]
# after_job = ["library_management_web_application.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"library_management_web_application.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# app_include_js = "/assets/library_management_web_application/js/books_list.js"



after_request = "library_management_web_application.public.utils.add_global_headers"




doc_events = {
    "*": { 
        "validate": "library_management_web_application.public.utils.check_version_hook"
    }
}



# app_include_css = [
#     "/assets/library_management_web_application/css/my_custom_theme.css"
# ]

app_include_css = "/assets/library_management_web_application/css/purple.css"

app_include_js = "/assets/library_management_web_application/js/theme_toggle.js"
