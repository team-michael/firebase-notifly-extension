require("dotenv").config();
const functions = require("firebase-functions");
const config = require("./config");
const {sendEvent} = require("./utils");

const cloudFunctions = {};
const googleAnalyticsConversionEvents = config.googleAnalyticsConversionEvents;
console.log(googleAnalyticsConversionEvents);
for (const conversionEvent of googleAnalyticsConversionEvents) {
  cloudFunctions[conversionEvent] = functions.analytics.event(conversionEvent).onLog(async (event) => {
    await sendEvent(event.name, event.user?.userId);
  });
}

exports.firebaseToNotifly = {
  ...cloudFunctions,
};
