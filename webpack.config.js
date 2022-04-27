import SentryPlugin from "@sentry/webpack-plugin";

module.exports = {
  devtool: "hidden-source-map",
  plugins: [
    new SentryPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.SENTRY_RELEASE,
    }),
  ],
};
