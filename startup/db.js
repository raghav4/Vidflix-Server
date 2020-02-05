const winston = require('winston');
const mongoose = require('mongoose');
module.exports = function () {
    mongoose.connect('mongodb://localhost/vidflix', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => winston.info('Connected to db...')) // winston.info
        // .catch(err => console.error('Not connected to mongodb!')) // if not connected log the exception and terminate the process.
}