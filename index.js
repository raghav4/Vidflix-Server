const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

if(!config.get('jwtPrivateKey')){
    console.log('Error: jwtPrivateKey is not defined!');
    process.exit(1);
}

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

mongoose.connect('mongodb://localhost/vidflix', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to db...'))
    .catch(err => console.error('Not connected to mongodb!'))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));