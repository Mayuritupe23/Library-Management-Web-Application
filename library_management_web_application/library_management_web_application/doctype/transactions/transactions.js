// Copyright (c) 2025, Mayuri Tupe and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Transactions", {
//     onload(frm) {
//         frappe.call({
//             method: "library_management_web_application.utils.check_version",
//             args: {
                
//             },
//             freeze: true,
//             async: true,
//             callback: function (r) {
                
//                 if (r.message) {
//                     console.log(r.message,"MAYURI");
//                     frappe.throw(r.message);

//                 }
                
//             }
//         });
        

// 	},
// });

// frappe.ui.form.on('Transactions', {
//     status: function(frm) {
//         if (frm.doc.status == 'Returned') {
//             frm.set_df_property('due_date', 'read_only', 1);  
//         } else {
//             frm.set_df_property('due_date', 'read_only', 0);  
//         }
//     }
// });



