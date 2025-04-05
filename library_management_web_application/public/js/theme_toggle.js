frappe.provide('frappe.ui');

frappe.ui.set_theme = function (theme) {
  const themeLink = document.getElementById("theme-style");

  if (!themeLink) {
    const link = document.createElement("link");
    link.id = "theme-style";
    link.rel = "stylesheet";
    link.href = `/assets/library_management_web_application/css/${theme}.css`;
    document.head.appendChild(link);
  } else {
    themeLink.href = `/assets/library_management_web_application/css/${theme}.css`;
  }

  localStorage.setItem("frappe_theme", theme);
};

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("frappe_theme") || "purple";
  frappe.ui.set_theme(savedTheme);
});


frappe.ready(() => {
    frappe.ui.toolbar.add_dropdown_button('Themes', 'Purple Theme', () => {
      frappe.ui.set_theme('purple');
    });
  });