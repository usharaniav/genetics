const { PORT } = require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const corsOptions = {
  //origin: "*",
};
app.use(cors(corsOptions));

const db = require("./app/models/db");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});

// Includes all the application routes
require("./app/routes")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
