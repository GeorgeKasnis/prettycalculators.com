const GA_ID = "G-VL24XPE0N4";
const CONSENT_KEY = "prettycalculators_cookie_consent";

export default defineNuxtPlugin((nuxtApp) => {
    const loadGoogleAnalytics = () => {
        if (window.__prettyCalculatorsGaLoaded) return;

        window.__prettyCalculatorsGaLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", GA_ID, {
            page_path: window.location.pathname + window.location.search,
            page_location: window.location.href,
        });

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);
    };

    window.__loadPrettyCalculatorsAnalytics = loadGoogleAnalytics;

    if (localStorage.getItem(CONSENT_KEY) === "accepted") {
        loadGoogleAnalytics();
    }

    nuxtApp.hook("page:finish", () => {
        if (!window.__prettyCalculatorsGaLoaded || typeof window.gtag !== "function") return;

        window.gtag("config", GA_ID, {
            page_path: window.location.pathname + window.location.search,
            page_location: window.location.href,
            page_title: document.title,
        });
    });
});
