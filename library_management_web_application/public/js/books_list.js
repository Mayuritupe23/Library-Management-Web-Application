frappe.ui.form.on('Books', {
    refresh: function (frm) {
        frm.add_custom_button('Import Books', () => {
            frappe.prompt([
                { fieldname: 'page', label: 'Page Number', fieldtype: 'Int', default: 1 }
            ],
            (values) => {
                frappe.call({
                    method: "library_management_web_application.library_management_web_application.api.import_books",
                    args: { page: values.page },
                    callback: function (response) {
                        frappe.msgprint(response.message);
                    }
                });
            },
            'Import Books from External API',
            'Import');
        });
    }
});
