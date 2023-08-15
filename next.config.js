module.exports = {
  experimental: {
    newNextLinkBehavior: true,
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_GRAASP_AUTH_HOST: process.env.NEXT_PUBLIC_GRAASP_AUTH_HOST,
    NEXT_PUBLIC_GRAASP_PERFORM_HOST:
      process.env.NEXT_PUBLIC_GRAASP_PERFORM_HOST,
    NEXT_PUBLIC_GRAASP_ANALYTICS_HOST:
      process.env.NEXT_PUBLIC_GRAASP_ANALYTICS_HOST,
    NEXT_PUBLIC_GRAASP_BUILDER_HOST:
      process.env.NEXT_PUBLIC_GRAASP_BUILDER_HOST,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GRAASPER_ID: process.env.NEXT_PUBLIC_GRAASPER_ID,
    NEXT_PUBLIC_SHOW_NOTIFICATIONS: process.env.NEXT_PUBLIC_SHOW_NOTIFICATIONS,
    NEXT_PUBLIC_S3_FILES_HOST: process.env.NEXT_PUBLIC_S3_FILES_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'graasp',
    project: 'graasp-library',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
