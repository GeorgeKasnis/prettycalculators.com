const GA_ID = "G-VL24XPE0N4";
const CONSENT_KEY = "prettycalculators_cookie_consent";

export default defineNuxtPlugin((nuxtApp) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    const accepted = localStorage.getItem(CONSENT_KEY) === "accepted";

    // Consent Mode v2: defaults must be set before the config call.
    // When denied, gtag sends cookieless anonymous pings and GA models the totals.
    window.gtag("consent", "default", {
        ad_storage: accepted ? "granted" : "denied",
        ad_user_data: accepted ? "granted" : "denied",
        ad_personalization: accepted ? "granted" : "denied",
        analytics_storage: accepted ? "granted" : "denied",
    });
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "url_passthrough", true);

    window.gtag("js", new Date());
    // send_page_view: false — page:finish handles all page views to avoid double-counting
    window.gtag("config", GA_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    const updateConsent = (granted) => {
        const value = granted ? "granted" : "denied";
        window.gtag("consent", "update", {
            ad_storage: value,
            ad_user_data: value,
            ad_personalization: value,
            analytics_storage: value,
        });
    };

    window.__updatePrettyCalculatorsConsent = updateConsent;
    // kept for backward compatibility with useCookieConsent
    window.__loadPrettyCalculatorsAnalytics = () => updateConsent(true);

    nuxtApp.hook("page:finish", () => {
        window.gtag("event", "page_view", {
            page_path: window.location.pathname + window.location.search,
            page_location: window.location.href,
            page_title: document.title,
        });
    });
});
