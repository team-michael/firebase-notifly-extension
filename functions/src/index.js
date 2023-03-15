/**
 * Triggered by a Firebase Mobile Analytics log event.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const functions = require("firebase-functions");
const config = require("./config");

// TODO: read conversion event lists from config
// TODO: Notifly API call

const cloudFunctions = {};
const googleAnalyticsConversionEvents = config.googleAnalyticsConversionEvents;

for (const conversionEvent of googleAnalyticsConversionEvents) {
  cloudFunctions[`firebaseToNotifly_${conversionEvent}`] = functions.analytics.event(conversionEvent).onLog((event) => {
    console.log();
    console.log("user", event.user);
    console.log("user id: ", event.user?.userId);
    console.log("event_name: ", event.name);
    // project id
    // username
    // password
  });
}

exports.firebaseToNotifly = {
  ...cloudFunctions,
};
