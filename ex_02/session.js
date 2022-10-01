// This uses Cookie-Session to store state/data in a cookie
let cookieSession = require("cookie-session");
let express = require("express");

let app = express();

app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.get("/", function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1;

  // Write response to web page
  res.end(req.session.views + " views");
});

app.listen(3000);
console.log("Running on port 3000");