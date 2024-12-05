export const sendPushNotificationToScreen = async ({
  notificationsArray,
  title,
  body,
  screen,
  spark,
}) => {
  const messages = notificationsArray.map((token) => ({
    to: token,
    sound: "default",
    title: title,
    body: body,
    data: { screen: screen, params: { spark: spark } },
  }));

  for (const message of messages) {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
};
