# Explore Express Web Server and its Security and Routes

# Here is data we will use

{"data":[
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
]}

# API Definition

{
"openapi": "3.0.0",
"info": {
"version": "1.0.0",
"title": "contacts",
"description": "Manage Contacts"
},
"paths": {
"/contacts/{contactId}": {
"parameters": [{
"name": "contactId",
"description": "The unique identifier of the contact",
"in": "path",
"required": true,
"schema": {
"$ref": "#/components/schemas/contactId"
}
}
],
"get": {
"summary": "Read a contact",
"responses": {
"200": {
"description": "The contact matching `contactId`",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/contact"
                }
              }
            }
          },
          "404": {
            "description": "No contact found for the provided `spacecraftId`",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
}
}
}
},
"500": {
"description": "Unexpected error",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "contactId": {
        "description": "The unique identifier of a contact",
        "type": "string"
      },
      "contact": {
        "type": "object",
        "required": [
          "id",
          "name",
          "email"
        ],
        "properties": {
          "id": {
            "$ref": "#/components/schemas/contactId"
},
"name": {
"type": "string"
},
"email": {
"type": "string"
},
"description": {
"type": "string"
}
}
},
"Error": {
"type": "object",
"required": [
"message"
],
"properties": {
"message": {
"description": "A human readable error message",
"type": "string"
}
}
}
},
"securitySchemes": {
"ApiKey": {
"type": "apiKey",
"in": "header",
"name": "X-Api-Key"
}
}
},
"security": [
{
"ApiKey": []
}
]
}
