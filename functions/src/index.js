const functions = require("firebase-functions");
const {sendEvent} = require("./utils");

const {
  location,
  project_id: projectID,
  username: userName,
  password,
  conversion_events: googleAnalyticsConversionEventsStr,
} = functions.config().notifly;
const googleAnalyticsConversionEvents = googleAnalyticsConversionEventsStr.split(",")
    .map((f) => f.trim())
    .filter((f) => f);

const cloudFunctions = {};
for (const conversionEvent of googleAnalyticsConversionEvents) {
  cloudFunctions[conversionEvent] = functions
      .region(location)
      .analytics.event(conversionEvent).onLog(async (event) => {
        await sendEvent(event.name, event.user?.userId, projectID, userName, password);
      });
}

exports.firebaseToNotifly = {
  ...cloudFunctions,
};
