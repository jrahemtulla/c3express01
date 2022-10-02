// contacts data is hardwired into memory
// server uses routes to GET and POST data
const express = require("express");
const app = express();
app.use(express.json());
// store contacts in an arrays
var contacts = [
  {
    name: "peter parker",
    age: 21,
    email: "peter@mit.edu",
  },
  {
    name: "bruce wayne",
    age: 32,
    email: "bruce@mit.edu",
  },
  {
    name: "diana prince",
    age: 25,
    email: "diana@mit.edu",
  },
];

app.get("/", function (req, res) {
  res.send("<h1>  Routes: try POST to /contact and GET /contacts </h1>");
});
// list all contacts
app.get("/contacts", function (req, res) {
  res.json(contacts);
});
// pass in data in the url as a query string
// http://localhost:3000/contact?name=bruce%20wayne&age=32&email=bruce%40mit.edu
app.get("/contact", function (req, res) {
  // get the data from the query string
  const name = req.query.name;
  const age = req.query.age;
  const email = req.query.email;
  // create a new contact object
  const newContact = {  
    name: name,
    age: age,
    email: email,
  };  
  // add contact to contacts array
  contacts.push(newContact);
  // send back the new contact
  res.json(newContact);
});
// pass contact name and email in params to add to contacts array
// http://localhost:3000/contact/sam%20smith/sam%40mit.edu
app.get("/contacts", (req, res) => {
  // just send a response with name and email as a test of using params 
  res.send(`name: ${req.params.name}, email: ${req.params.email}`);
});
app.listen(3000);
console.log("Running on port 3000");
