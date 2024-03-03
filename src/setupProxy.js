const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify the path that you want to proxy
    createProxyMiddleware({
      target: "https://api.muggle.link", // Specify the target URL
      changeOrigin: true, // Needed for virtual hosted sites
      // Other optional settings such as headers, etc.
    })
  );
};
