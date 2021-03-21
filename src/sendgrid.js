const sendGridMailService = require("@sendgrid/mail");
/*
    adding API key for sendgrid mail service
*/
sendGridMailService.setApiKey(
  "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"
);
/*
    this is first middleware that handles email servies.
    accepts request and response objects.
*/
function sendEmailUsingSendGrid(request, response, next) {

  /*
      messageToSend object holds email body which includes sender info ,receiver info, subject of mail and text to send.
  */
  const messageToSend = {
    to: request.body.to,
    from: "vaibhav.jadhav.csm@gmail.com",
    subject: request.body.subject,
    text: request.body.text,
  };
  /*
    sending mail using  send() method accepts  messageToSend 
    send() method returns a promise.
  */
  sendGridMailService
    .send(messageToSend)
    .then(() => {
      /*
          if email is sent successfully then we are returning object which includes message sent status and service used.
      */
      const responseMessage = {
        message: "Message Sent",
        serviceUsed: "Send Grid",
      };
      response.status(200).json(responseMessage);
    })
    .catch((error) => {
      /*
        if this emil service is down the next middleware called to send mail.
      */
      next();
    });
}
module.exports = { sendEmailUsingSendGrid };