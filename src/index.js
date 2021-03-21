const express = require("express");
const cors = require("cors");
const app = express();
const {sendEmailUsingSendGrid} = require("./sendgrid")
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080

app.post('/emailService',sendEmailUsingSendGrid,(request,response)=>{
    response.json({
      "failed ":"somwone"
    });
})

app.listen(PORT, () => {
  console.log("Listening you on " + PORT);
});
