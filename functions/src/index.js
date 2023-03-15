/**
 * Triggered by a Firebase Mobile Analytics log event.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const functions = require("firebase-functions");

// TODO: read conversion event lists from config
// TODO: Notifly API call

exports.firebaseToNotifly = functions.analytics.event("ticket_purchase").onLog((event) => {
  console.log("user", event.user);
  console.log("user id: ", event.user?.userId);
  console.log("event_name: ", event.name);
  // project id
  // username
  // password
});
