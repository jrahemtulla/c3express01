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

// pass contact name in params to retrieve contact
//http://localhost:3000/contact/peter%20parker  
app.get("/contact/:name", function (req, res) {
  // get the data from the query string
  const name = req.params.name;
  let acontact = contacts.find((contact) => contact.name === name);
  if (acontact) {
    res.json(acontact);
  } else {  
    res.send("contact not found");
  }
});
// pass in data in the url as a query string to add a new contact
// http://localhost:3000/contact?name=anne%20smith&age=32&email=anne%40mit.edu
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

  // add the new contact to the array
  contacts.push(newContact);
  // send the new contact back to the client
  res.json(newContact);
});

app.get("/contacts", (req, res) => {
  // just send a response with name and email
  res.send(`name: ${req.params.name}, email: ${req.params.email}`);
});
app.listen(3000);
console.log("Running on port 3000");
