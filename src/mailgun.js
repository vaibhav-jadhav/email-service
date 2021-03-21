const mailgun = require("mailgun-js");
const DOMAIN = "sandbox573e43e9bf24426f814506fb813581b1.mailgun.org";
/*
    adding API key for sendgrid mail service
*/
const mailGunMailService = mailgun({
  apiKey: "96c4049576fedfd9fd0efdab0af72a08-73e57fef-91ff685d",
  domain: DOMAIN,
});
/*
    this is second middleware that handles email servies only if first service is failed.
    accepts request and response objects.
*/
function sendEmailUsingMailGun(request, response, next) {

  /*
      messageToSend object holds email body which includes sender info ,receiver info, subject of mail and text to send.
  */
  const messageToSend = {
    from:
      "Mailgun Sandbox <postmaster@sandbox573e43e9bf24426f814506fb813581b1.mailgun.org>",
    to: request.body.to,
    subject: request.body.subject,
    text: request.body.text,
  };
  /*
    sending mail using  send() method accepts  messageToSend  and a callback function
    callback function is called when if mail is sent successfully or if there is an error.
  */
  mailGunMailService.messages().send(messageToSend, function (error, responseBody) {
    /*
        if there is an error we cant send mail because both of the services are failled to deliver mail.
        we are responding back with
                1) Message that teels we are unable to send mail.
                2) which services failed to deliver mail so far
    */
    if (error) {
      const responseMessage = {
        message: "Message Not Sent",
        failedServices: ["SendGrid","MailGun"]
      };
      response.status(200).json(responseMessage);
    } else {

      /*
        if second mail service i.e. mailgun able to send mail 
        we are responding back with
                1) which service we have used to send mail
                2) which services failed to deliver mail so far
      */
      const responseMessage = {
        message: "Message Sent",
        serviceUsed: "MailGun",
        failedServices: ["SendGrid"]
      };
      /*
        sending json response
      */
      response.status(200).json(responseMessage);
    }
  });
}
module.exports = { sendEmailUsingMailGun };
