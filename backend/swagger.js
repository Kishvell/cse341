const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for Contacts Project"
  },
  host: "https://cse341-l7no.onrender.com/",
  basePath: "/contacts",
  schemes: ["https", "http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);