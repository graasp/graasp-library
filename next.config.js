module.exports = {
  experimental: {
    newNextLinkBehavior: true,
    swcPlugins: ['swc-plugin-coverage-instrument'],
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_PUBLISHED_TAG_ID: process.env.NEXT_PUBLIC_PUBLISHED_TAG_ID,
    NEXT_PUBLIC_GRAASP_AUTH_HOST: process.env.NEXT_PUBLIC_GRAASP_AUTH_HOST,
    NEXT_PUBLIC_GRAASP_PERFORM_HOST:
      process.env.NEXT_PUBLIC_GRAASP_PERFORM_HOST,
    NEXT_PUBLIC_GRAASP_BUILDER_HOST:
      process.env.NEXT_PUBLIC_GRAASP_BUILDER_HOST,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GRAASPER_ID: process.env.NEXT_PUBLIC_GRAASPER_ID,
    NEXT_PUBLIC_S3_FILES_HOST: process.env.NEXT_PUBLIC_S3_FILES_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
};
