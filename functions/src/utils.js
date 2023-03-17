const fetch = require("node-fetch");

/**
 * Send firebase event to Notifly.
 *
 * @param {!Object} eventName Name of the event
 * @param {!Object} userID User ID
 * @param {!Object} projectID Project ID
 * @param {!Object} userName User name
 * @param {!Object} password Password
 */
async function sendEvent(eventName, userID, projectID, userName, password) {
  const authorizeHeaders = {
    "Content-Type": "application/json",
  };

  const authorizeUrl = "https://api.notifly.tech/authorize";
  const authorizeBody = {
    userName: userName,
    password: password,
  };
  const trackEventUrl = "https://api.notifly.tech/track-event";
  const trackEventBody = {
    projectID: projectID,
    eventName: `firebase__${eventName}`,
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
