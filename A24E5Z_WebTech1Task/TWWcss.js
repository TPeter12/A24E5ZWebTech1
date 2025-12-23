document.addEventListener("DOMContentLoaded", function () {
    console.log("TWWcss.js betöltve");

    // Linkek összegyűjtése
    const mainLink    = document.getElementById("theme-main");     // TWW.css / TWW1.css
    const legendsLink = document.getElementById("theme-legends"); // TWWlegends.css / TWWlegends1.css
    const gunsLink    = document.getElementById("theme-guns");    // később TWWguns.css / TWWguns1.css
    const mediaLink   = document.getElementById("theme-media");   // TWWmedia.css / TWWmedia1.css
    const formLink    = document.getElementById("theme-form");    // TWWform.css / TWWform1.css

    // Aktuális téma betöltése (alap: sheriff)
    let currentTheme = localStorage.getItem("selectedTheme") || "sheriff";

    // Téma alkalmazása minden releváns linkre
    function applyTheme(theme) {
        const timestamp = new Date().getTime();
        currentTheme = theme;

        if (mainLink) {
            mainLink.href = (theme === "sheriff" ? "TWW.css" : "TWW1.css") + "?v=" + timestamp;
        }

        if (legendsLink) {
            legendsLink.href = (theme === "sheriff" ? "TWWlegends.css" : "TWWlegends1.css") + "?v=" + timestamp;
        }

        if (gunsLink) {
            gunsLink.href = (theme === "sheriff" ? "TWWguns.css" : "TWWguns1.css") + "?v=" + timestamp;
        }

        if (mediaLink) {
            mediaLink.href = (theme === "sheriff" ? "TWWmedia.css" : "TWWmedia1.css") + "?v=" + timestamp;
        }

        if (formLink) {
            formLink.href = (theme === "sheriff" ? "TWWform.css" : "TWWform1.css") + "?v=" + timestamp;
        }
    }

    // Első betöltéskor alkalmazás
    applyTheme(currentTheme);

    // Téma váltó gombok (csak a kezdőlapon vannak)
    const sheriffBtn = document.getElementById("sheriff-btn");
    const banditaBtn = document.getElementById("bandita-btn");

    if (sheriffBtn && banditaBtn) {
        sheriffBtn.addEventListener("click", () => {
            localStorage.setItem("selectedTheme", "sheriff");
            applyTheme("sheriff");
            sheriffBtn.classList.add("active");
            banditaBtn.classList.remove("active");
        });

        banditaBtn.addEventListener("click", () => {
            localStorage.setItem("selectedTheme", "bandita");
            applyTheme("bandita");
            banditaBtn.classList.add("active");
            sheriffBtn.classList.remove("active");
        });

        // Aktív gomb kiemelése
        if (currentTheme === "sheriff") {
            sheriffBtn.classList.add("active");
            banditaBtn.classList.remove("active");
        } else {
            banditaBtn.classList.add("active");
            sheriffBtn.classList.remove("active");
        }
    }

    // Másik lapon történő váltás érzékelése (ezzel minden oldalon frissül)
    window.addEventListener("storage", (e) => {
        if (e.key === "selectedTheme" && e.newValue && e.newValue !== currentTheme) {
            applyTheme(e.newValue);
        }
    });
});