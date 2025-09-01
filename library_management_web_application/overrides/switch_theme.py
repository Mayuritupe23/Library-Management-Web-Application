import frappe
from frappe import _

@frappe.whitelist()
def switch_theme(theme):
    allow_custom_desk_theme()
    user = frappe.get_doc("User", frappe.session.user)
    user.set("desk_theme", theme)
    user.save()
    frappe.clear_cache(user.name)
    return {"message": _("Theme switched to {0}").format(theme)}

# this function set option in in theme using property setter
def allow_custom_desk_theme():
    from frappe.custom.doctype.property_setter.property_setter import make_property_setter

    options = "Light\nDark\nAutomatic\nErpnext_professional"

    make_property_setter(
        doctype="User",
        fieldname="desk_theme",
        property="options",
        value=options,
        property_type="Text"
    )
