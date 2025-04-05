frappe.ready(() => {
    // Custom Theme: Purple
    const purpleTheme = {
      name: "purple",
      css: "/library_management_web_application/purple_theme/assets/css/purple.css"
    };
  
    // Register theme in localStorage or as default
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", purpleTheme.name);
    }
  
    // Inject CSS dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = purpleTheme.css;
    document.head.appendChild(link);
  });
  