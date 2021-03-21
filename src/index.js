const express = require("express");
const cors = require("cors");
const app = express();
const {sendEmailUsingSendGrid} = require("./sendgrid")
const {sendEmailUsingMailGun} = require("./mailgun")
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080

app.post('/emailService',sendEmailUsingMailGun,sendEmailUsingSendGrid);

app.listen(PORT, () => {
  console.log("Listening you on " + PORT);
});
