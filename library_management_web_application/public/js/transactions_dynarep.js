frappe.query_reports["Transactions DynaRep"] = {
    "filters": [
        {
            "fieldname": "members",
            "label": __("Members"),
            "fieldtype": "MultiSelect",
            "options": "Members",
            "get_data": function() {
                return frappe.db.get_list('Members', {
                    fields: ['name', 'full_name', 'member_id'],
                    limit: 100
                }).then(r => {
                    return r.map(d => ({
                        value: d.name,
                        description: d.full_name + " (" + d.member_id + ")"
                    }));
                });
            }
        },
        {
            "fieldname": "book",
            "label": __("Book"),
            "fieldtype": "Link",
            "options": "Books"
        },
        {
            "fieldname": "status",
            "label": __("Status"),
            "fieldtype": "Select",
            "options": ["", "Issued", "Returned"],
            "default": "Issued"
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.add_months(frappe.datetime.get_today(), -1)
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.get_today()
        },
        {
            "fieldname": "report_type",
            "label": __("Report Type"),
            "fieldtype": "Select",
            "options": ["summary", "detailed"],
            "default": "summary"
        },
        {
            "fieldname": "group_by",
            "label": __("Group By"),
            "fieldtype": "Select",
            "options": ["", "member"],
            "depends_on": "eval:doc.report_type=='summary'"
        }
    ]
};