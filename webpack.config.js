import SentryPlugin from "@sentry/webpack-plugin";

module.exports = {
  devtool: "source-map",
  plugins: [
    new SentryPlugin({
      org: "kiizankiizan",
      project: "wardrobe",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.SENTRY_RELEASE,
      include: "./dist",
    }),
  ],
};
