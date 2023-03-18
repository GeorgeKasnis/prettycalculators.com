export default ({ app }) => {
    if (process.env.NODE_ENV !== "production") return;
  
    window.dataLayer = window.dataLayer || [];
  
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-C5PBQPTJG5", {
      page_path: window.location.pathname,
    });
  
    app.router.afterEach((to) => {
      gtag("config", "G-C5PBQPTJG5", {
        page_path: to.fullPath,
      });
    });
  };
  