const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Games API",
    description: "API documentation for Games Project"
  },
  host: "https://cse341-l7no.onrender.com/",
  basePath: "/games",
  schemes: ["https","http"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);