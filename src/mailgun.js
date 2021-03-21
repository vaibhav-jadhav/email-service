const mailgun = require("mailgun-js");
const DOMAIN = "sandbox573e43e9bf24426f814506fb813581b1.mailgun.org";
const mailGunMailService = mailgun({
  apiKey: "96c4049576fedfd9fd0efdab0af72a08-73e57fef-91ff685d",
  domain: DOMAIN,
});
function sendEmailUsingMailGun(request, response, next) {
  const messageToSend = {
    from:
      "Mailgun Sandbox <postmaster@sandbox573e43e9bf24426f814506fb813581b1.mailgun.org>",
    to: request.body.to,
    subject: request.body.subject,
    text: request.body.text,
  };
  mailGunMailService.messages().send(messageToSend, function (error, body) {
    if (error) {
            next();
    } else {
        const responseMessage = {
            message: "Message Sent",
            serviceUsed: "MailGun",
          };
          response.status(200).json(responseMessage);
    }
  });
}
module.exports = { sendEmailUsingMailGun };
