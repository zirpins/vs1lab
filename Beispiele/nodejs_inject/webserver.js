const express = require("express"); 

const app = express();
app.listen(3000, () => console.log("Server listening on port 3000"));

app.get("/hello", (req, res) => {
  const url_parts = new URL(req.url, `http://${req.headers.host}`);
	const query = url_parts.searchParams;
  const name = query.has("name") ? query.get("name") : "Anonymous";
  res.send(`<html><head></head><body><h1>Greetings ${name}, have a nice day!</h1></body></html>`);
});
