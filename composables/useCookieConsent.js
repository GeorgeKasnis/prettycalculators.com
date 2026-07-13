const CONSENT_KEY = "prettycalculators_cookie_consent";

export const useCookieConsent = () => {
    const status = useState("cookie-consent-status", () => "pending");
    const ready = useState("cookie-consent-ready", () => false);

    const loadAnalytics = () => {
        if (process.client && typeof window.__loadPrettyCalculatorsAnalytics === "function") {
            window.__loadPrettyCalculatorsAnalytics();
        }
    };

    const initConsent = () => {
        if (!process.client) return;

        const saved = localStorage.getItem(CONSENT_KEY);
        status.value = saved === "accepted" || saved === "rejected" ? saved : "pending";
        ready.value = true;

        if (status.value === "accepted") {
            loadAnalytics();
        }
    };

    const acceptCookies = () => {
        if (!process.client) return;

        localStorage.setItem(CONSENT_KEY, "accepted");
        status.value = "accepted";
        ready.value = true;
        loadAnalytics();
    };

    const rejectCookies = () => {
        if (!process.client) return;

        localStorage.setItem(CONSENT_KEY, "rejected");
        status.value = "rejected";
        ready.value = true;

        if (typeof window.__updatePrettyCalculatorsConsent === "function") {
            window.__updatePrettyCalculatorsConsent(false);
        }
    };

    const resetCookieConsent = () => {
        if (!process.client) return;

        localStorage.removeItem(CONSENT_KEY);
        status.value = "pending";
        ready.value = true;
    };

    return {
        status,
        ready,
        initConsent,
        acceptCookies,
        rejectCookies,
        resetCookieConsent,
    };
};
