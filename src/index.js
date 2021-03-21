const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080

app.post('/emailService',(request,response)=>{
  
})

app.listen(PORT, () => {
  console.log("Listening you on " + PORT);
});
