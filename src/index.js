const express = require("express");
const cors = require("cors");
const app = express();
const {sendEmailUsingSendGrid} = require("./sendgrid")
const {sendEmailUsingMailGun} = require("./mailgun")
/*
  added  cors middleware for cross-domain requests.
*/
app.use(cors());
app.use(express.json());
/*
  PORT can be user define(8080) or granted by system at runtime.
*/
const PORT = process.env.PORT || 8080
/*
  /emailService is a POST endpoint used to send email.
  added 2 middlewares to send email i.e. (sendgrid and mailgun)
  if first service fails the request will be forwarded to another email service
*/
app.post('/emailService',sendEmailUsingSendGrid,sendEmailUsingMailGun);

/*
  starting express server on user defined PORT 8080 or port given by system.
*/
app.listen(PORT, () => {
  console.log("Listening you on " + PORT);
});
