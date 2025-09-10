
/* Add to your theme switcher JS */
frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
    constructor() {
        super()
    }
  
    fetch_themes() {
        return new Promise((resolve) => {
            this.themes = [
                {
                    name: "erpnext_professional",
                    label: "ERPNext Professional",
                    info: "Enhanced professional theme"
                },
                {
                    name: "light",
                    label: "Frappe Light",
                    info: "Default light theme"
                },
                {
                    name: "dark",
                    label: "Timeless Night",
                    info: "Dark theme"
                },
                {
                    name: "automatic",
                    label: "Automatic",
                    info: "Uses system preference"
                }
            ];
            resolve(this.themes);
        });
    }
  }

