require("dotenv").config();
const fetch = require("node-fetch");

/**
 * Send firebase event to Notifly.
 *
 * @param {!Object} eventName Name of the event
 * @param {!Object} userID User ID
 */
async function sendEvent(eventName, userID) {
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

  try {
    const response = await fetch(authorizeUrl, {
      method: "POST",
      headers: authorizeHeaders,
      body: authorizeEncodedBody,
    });

    const tokenData = await response.json();
    const token = tokenData.data;

    const trackEventHeaders = {
      "Content-Type": "application/json",
      "Authorization": token,
    };

    const trackEventResponse = await fetch(trackEventUrl, {
      method: "POST",
      headers: trackEventHeaders,
      body: trackEventEncodedBody,
    });

    return await trackEventResponse.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  sendEvent,
};
