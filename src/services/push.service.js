/* eslint-disable no-console */
const dayjs = require('dayjs');
const webpush = require('web-push');

webpush.setVapidDetails('mailto:test@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

const sendPushNotification = async (subscription, payload) => {
  try {
    const stringifiedPayload = JSON.stringify(payload); // Stringify the payload
    await webpush.sendNotification(subscription, stringifiedPayload);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

const prepareNotificationPayload = (type, appointmentDetails) => {
  const formattedDateTime = dayjs(appointmentDetails.appointmentDateTime).format('dddd, MMMM D, YYYY h:mm A');

  return {
    title: `Appointment ${type}`,
    body: `Your appointment on ${formattedDateTime} has been ${type}.`,
    icon: '/android/android-launchericon-192-192.png', // Handle this icon path on the front-end
    data: appointmentDetails,
  };
};

module.exports = {
  sendPushNotification,
  prepareNotificationPayload,
};
