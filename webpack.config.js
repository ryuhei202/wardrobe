import SentryPlugin from "@sentry/webpack-plugin";

module.exports = {
  devtool: "hidden-source-map",
  plugins: [
    new SentryPlugin({
      org: process.env.REACT_APP_SENTRY_ORG,
      project: process.env.REACT_APP_SENTRY_PROJECT,
      authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
      include: ".",
    }),
  ],
};
