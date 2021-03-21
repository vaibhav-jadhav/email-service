const sendGridMailService = require("@sendgrid/mail");
sendGridMailService.setApiKey(
  "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"
);
function sendEmailUsingSendGrid(request,response,next) {
  const messageToSend = {
    to: request.body.to,
    from: "vaibhav.jadhav.csm@gmail.com",
    subject: request.body.subject,
    text: request.body.text,
  };

  sendGridMailService
    .send(messageToSend)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = { sendEmailUsingSendGrid };
