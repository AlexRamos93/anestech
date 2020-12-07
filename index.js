/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./config/auth')();
const routes = require('./routes/routes');
const { ValidationError } = require('express-validation');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(auth.initialize());
app.use(routes);
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof ValidationError)
        return res.status(err.statusCode).json({ message: err.details.body });

    // other type of errors, it might also be a Runtime Error
    return res.status(500).send(err.stack);
});

// Desativa o X-Powered-By: Express
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});
