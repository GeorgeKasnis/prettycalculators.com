const GA_ID = "G-VL24XPE0N4";
const CONSENT_KEY = "prettycalculators_cookie_consent";

export default defineNuxtPlugin((nuxtApp) => {
    // Tracks whether page:finish has fired before GA was loaded (consent-delayed scenario)
    let pageFinishFired = false;

    const trackPageView = () => {
        window.gtag("event", "page_view", {
            page_path: window.location.pathname + window.location.search,
            page_location: window.location.href,
            page_title: document.title,
        });
    };

    const loadGoogleAnalytics = () => {
        if (window.__prettyCalculatorsGaLoaded) return;

        window.__prettyCalculatorsGaLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        // send_page_view: false — page:finish handles all page views to avoid double-counting
        window.gtag("config", GA_ID, { send_page_view: false });

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        // If page:finish already fired before consent was given, track the current page now
        if (pageFinishFired) {
            trackPageView();
        }
    };

    window.__loadPrettyCalculatorsAnalytics = loadGoogleAnalytics;

    if (localStorage.getItem(CONSENT_KEY) === "accepted") {
        loadGoogleAnalytics();
    }

    nuxtApp.hook("page:finish", () => {
        pageFinishFired = true;
        if (!window.__prettyCalculatorsGaLoaded || typeof window.gtag !== "function") return;

        trackPageView();
    });
});
