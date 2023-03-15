/**
 * Triggered by a Firebase Mobile Analytics log event.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
require("dotenv").config();
const functions = require("firebase-functions");
const config = require("./config");
// TODO: read conversion event lists from config
/**
 * log event using notifly server-api.
 *
 * @param {!Object} eventName event_name
 * @param {!Object} userID user_id
 */
async function trackEvent(eventName, userID) {
  const authorizeHeaders = {
    "Content-Type": "application/json",
  };

  const authorizeUrl = "https://api.notifly.tech/authorize";
  const authorizeBody = {
    userName: process.env.NOTIFLY_USERNAME,
    password: process.env.NOTIFLY_PASSWORD,
  };
  const trackEventUrl = "https://api.notifly.tech/track-event";
  const trackEventBody = {
    projectID: process.env.NOTIFLY_PROJECT_ID,
    eventName: eventName,
    isGlobalEvent: false,
    segmentationEventParamKeys: [],
    userID: userID,
  };
  const authorizeEncodedBody = JSON.stringify(authorizeBody);
  const trackEventEncodedBody = JSON.stringify(trackEventBody);
  const token = await fetch(authorizeUrl, {
    method: "POST",
    headers: authorizeHeaders,
    body: authorizeEncodedBody,
  }).then(async (response) => {
    const token = (await response.json());
    console.log(token.error);
    return token.data;
  });
  const trackEventHeaders = {
    "Content-Type": "application/json",
    "Authorization": token,
  };

  return (await fetch(trackEventUrl, {
    method: "POST",
    headers: trackEventHeaders,
    body: trackEventEncodedBody,
  })).json();
}

const cloudFunctions = {};
const googleAnalyticsConversionEvents = config.googleAnalyticsConversionEvents;
for (const conversionEvent of googleAnalyticsConversionEvents) {
  cloudFunctions[`firebaseToNotifly_${conversionEvent}`] = functions.analytics.event(conversionEvent).onLog(async (event) => {
    await trackEvent(event.name, event.user?.userId);
  });
}

exports.firebaseToNotifly = {
  ...cloudFunctions,
};
