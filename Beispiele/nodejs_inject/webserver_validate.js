const express = require("express"); 
const validator = require('validator');

const app = express();
app.listen(3001, () => console.log("Server listening on port 3001"));

app.get("/hello", (req, res) => {
  const name = req.query.name ?? "Anonymous";
  const cleaned = validator.escape(name); //escaping HTML
    console.log(cleaned);
  res.send("<html><head></head><body><h1>Greetings "
      + cleaned + ", have a nice day!</h1></body></html>");
});
