const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Games API",
    description: "API documentation for Games Project"
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);