const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Games API",
    description: "API documentation for Games Project"
  },
  host: "cse341-l7no.onrender.com",
  basePath: "/games",
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen()(outputFile, routes, doc);