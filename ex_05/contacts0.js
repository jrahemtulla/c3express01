// contacts data is hardwired into memory
// server uses routes to GET and POST data
const express = require("express");
const app = express();
app.use(express.json());

// store contacts in an arrays

// default route  
app.get("/", function (req, res) {
  res.send("<h1>  Routes: try  GET /contacts </h1>");
});
// list all contacts
// http://localhost:3000/contacts  in your browser
// in your terminal window
// curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/contacts

app.get("/image", function (req, res) {
  // return an image
  res.sendFile(__dirname+"/images/Conrad3.jpg");
});

app.listen(3000);
console.log("Running on port 3000");
