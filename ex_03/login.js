// this uses /login to authorize a use

var express = require("express");
var app = express();
const fetch = require("node-fetch");
var bodyParser = require("body-parser");
// body parser extracts the entire body portion of an incoming request stream and exposes it on req.body
// the middleware was a part of Express.js earlier but now you have to install it separately.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
//athenticate is a middleware function that checks for a secret token
// if the token is present, it calls next() to call the next route
// if the token is not present, it sends a 401 error
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    if (authHeader == "passwordname") {
      req.user = "name";
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
// authenticate2 is a middleware function that checks for a secret token
// if the token is present, it calls next() to call the next route
// if the token is not present, it sends a 401 error
const authenticate2 = (req, res, next) => {
  const url = req.url;
  if (url) {
    let path = url.split("=");
    if (path[1] == "secret-token") {
      req.user = "john";
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
// store contacts in an arrays
var contacts = [
  {
    name: "peter parker",
    age: 21,
    email: "peter@mit.edu",
    courses: [
      { number: "1.00", name: "engr comp" },
      { number: "3.00", name: "intro bio" },
    ],
  },
  {
    name: "bruce wayne",
    age: 32,
    email: "bruce@mit.edu",
    courses: [
      { number: "2.00", name: "intro ME" },
      { number: "3.00", name: "intro MS" },
    ],
  },
  {
    name: "diana prince",
    age: 25,
    email: "diana@mit.edu",
    courses: [
      { number: "2.00", name: "intro arch" },
      { number: "1.00", name: "intro chem" },
    ],
  },
];
// app.get("/", function (req, res) {
app.get("/", function (req, res) {
  res.send("<h1> Routes: try POST to /contact and GET /contacts </h1>");
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
  // check if user is in DB if so send back security token
  // check is not implemented here but we send back a token with value secret-token
  let form = `<form action="/contacts" method="get">
  <label for="name">Get Contacts </label>
  <input id="token" type="hidden" name="token" value="secret-token">
  <input type="submit" value="OK">
  </form>`;

  res.send(form);
});

//athenticate2 is used to check if the token is correct
app.get("/contacts", authenticate2, (req, res) => {
  res.json(contacts);
});
// authenticate is used to check if the user is in the DB
app.get("/contacts/:name/:email", (req, res) => {
  // just send a response with name and email
  res.send(`name: ${req.params.name}, email: ${req.params.email}`);
});
// add a contact using Postman or curl
//  curl -X POST -H "Content-Type: application/json" -d '{"name":"john","age":21,"email":"

app.post("/contact", (req, res) => {
  // add a contact
  let contact = req.body;
  contacts.push(contact);
  res.redirect("/contacts/" + req.body.name);
});
app.get("/contacts/:name", (req, res) => {
  // in this case we redirect with name as a parameter
  res.send("Redirect with " + req.params.name);
});
app.listen(3000, function () {
console.log("Running on port 3000");
});
