module.exports = {
  projectId: process.env.NOTIFLY_PROJECT_ID,
  username: process.env.NOTIFLY_USERNAME,
  password: process.env.NOTIFLY_PASSWORD,
  googleAnalyticsConversionEvents:
    (process.env.GOOGLE_ANALYTICS_CONVERSION_EVENTS || "")
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
};
