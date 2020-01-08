const Joi = require("@hapi/joi");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use("/api/genres", genres);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
