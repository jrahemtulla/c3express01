// this uses /login to authorize a use

var express = require("express");
var app = express();
const fetch = require("node-fetch");
var bodyParser = require("body-parser");
// body parser extracts the entire body portion of an incoming request stream and exposes it on req.body
// the middleware was a part of Express.js earlier but now you have to install it separately.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

// authenticate2 is a middleware function that checks for a secret token in the url
// if the token is present, it calls next() to call the next route
// if the token is not present, it sends a 401 error
const authenticate = (req, res, next) => {
  const url = req.url;
  if (url) {
    let path = url.split("=");
    // not so secrt token is in the url
    if (path[1] == "secret-token") {
      req.user = "john";
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
// store contacts in an arrays
// role is a property of each contact that is either "reader" or "editor"
// reader can only read contacts
// editor can read and write contacts
var contacts = [
  {
    name: "peter parker",
    age: 21,
    email: "peter@mit.edu",
    role: "reader"
  },
  {
    name: "bruce wayne",
    age: 32,
    email: "bruce@mit.edu",
    role: "reader"
  },
  {
    name: "diana prince",
    age: 25,
    email: "diana@mit.edu",
    role: "editor"
  },
];
// app.get("/", function (req, res) {
app.get("/", function (req, res) {
  res.send("<h1> Routes: Try http://localhost:3000/login </h1>");
});
// login form with a post request to /auth  and a get request to /login
app.get("/login", (req, res) => {
  // send back a login form
  let form = `<form action="/auth" method="post">
    <label for="name">Enter name: </label>
    <input id="name" type="text" name="name" value="name">
    <input id="password" type="text" name="password" value="password">
    <input type="submit" value="OK">
    </form>`;
  res.send(form);
});
// app.post("/auth", (req, res) => {
// check the user name and password
// if (req.body.name == "name" && req.body.password == "password") {
//   res.send("authorized");
app.post("/auth", (req, res) => {
  let { name, password } = req.body;
  // check the user name and password
  if(name == "name" && password == "password") {
  // we should check if user is in DB if so send back security token
  // check is not implemented here but we send back a token with value secret-token
  // we dynamically create a form with a hidden field that contains the token
  let form = `<form action="/contacts" method="get">
  <label for="name">Get Contacts </label>
  <input id="token" type="hidden" name="token" value="secret-token">
  <input type="submit" value="OK">
  </form>`;

  res.send(form);
}});

//athenticate2 is used to check if the token is correct
app.get("/contacts", authenticate, (req, res) => {
  res.json(contacts);
});


app.post("/contact", (req, res) => {
  // add a contact
  let contact = req.body;
  contacts.push(contact);
  res.redirect("/contacts/" + req.body.name);
});

app.listen(3000, ()=> {console.log("Running on port 3000");});
