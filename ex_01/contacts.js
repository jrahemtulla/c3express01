// server uses routes to GET and POST data
const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.json());
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

app.get("/", function (req, res) {
  res.send("<h1>  Routes: try POST to /contact and GET /contacts </h1>");
});
// list all contacts
app.get("/contacts", function (req, res) {
  res.json(contacts);
});
// add a contact using Postman or curl
// curl -X POST -H "Content-Type: application/json" -d '{"name":"john doe","age":25,"email":"john@mit.edu"}' http://localhost:3000/contact 
//  Edit this code so that it adds a new contact to the contacts array and returns all the contacts
app.post("/contact", (req, res) => {
  //const newContact = req.body;  // this is the same as the next line but shorter
  const newContact = { name: req.body.name, age: req.body.age, email: req.body.email }
// add contact to contacts array 
  res.json(newContact); // edit to send back all contacts 
  console.log(`Addding: ${JSON.stringify(req.body)}`) // notice backticks for template string
});

app.listen(3000);
console.log("Running on port 3000");
