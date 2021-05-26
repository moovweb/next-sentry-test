const { withSentryConfig } = require('@sentry/nextjs')
const withOffline = require('next-offline')
const { join } = require('path')

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(
  withOffline({
    // withServiceWorker({
    // Output sourcemaps so that stacktraces have original source filenames and line numbers when tailing
    // the logs in the Layer0 developer console.
    layer0SourceMaps: true,
    target: 'experimental-serverless-trace',
    generateSw: false,
    workboxOpts: {
      swSrc: join(process.cwd(), 'sw', 'service-worker.js'),
      swDest: join(process.cwd(), '.next', 'static', 'service-worker.js'),
    },
  }),
  SentryWebpackPluginOptions
)
