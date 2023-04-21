const admin = require("../configs/firebase.js");

const sendMessageTopic = (data) => {
  return new Promise(async (resolve, reject) => {
    const topic = data.topic;
    const payload = {
      notification: {
        title: data.title,
        body: data.body,
      },
    };
    await admin
      .messaging()
      .sendToTopic(topic, payload)
      .then((response2) => {
        // Response2 is a message ID string.
        return resolve({
          message: "Successfully sent message",
          messageId: response2.messageId,
        });
      })
      .catch((error) => {
        console.log(error);
        return reject("Error sending message:", error);
      });
  });
};

const subscribeToTopic = (token, topic) => {
  return new Promise(async (resolve, reject) => {
    console.log(token, topic);
    await admin
      .messaging()
      .subscribeToTopic(token, `/topics/${topic}`)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        console.log(error);
        return reject("subscribe failed");
      });
  });
};

module.exports = {
  sendMessageTopic: sendMessageTopic,
  subscribeToTopic: subscribeToTopic,
};
