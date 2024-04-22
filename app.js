/*
 * @file: app.js
 * @description: It Contain server setup function.
 * @author: Pankaj Chaudhari
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import * as DB from './db';
import SwaggerJsDocs from './swagger-config';
import api from './api';
import { failAction } from './utilities/response';
const { port } = config.get('app');
import fileUpload from "express-fileupload";
const imagePath = "./public/uploads/images/";
import scheduler from './utilities/scheduler';

const fs = require('fs');

const app = express();
const http = require('http');
const https = require('https');
// app.use(fileUpload());
// Access-Control-Allow-Origin
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// parse application/json
app.use(bodyParser.json());
/*********** Swagger UI setup ********************/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));
/*********** All Routes ********************/
app.use('/api/v1', api);
console.log("__dirname ---->", __dirname);
// console.log("__dirname ---->", __dirname +"/"+ "../public/images");

//Live
//app.use(express.static(path.join("/home/ubuntu/welness/public/images")));

//Test server
// app.use(express.static(path.join("/home/ubuntu/development/ranjeet/public/images")));
// app.use(express.static(path.join("home/pankajchaudhari/OfficalData/Driving%20Safety/Code/drivingsafety_backend/public/images/blogs")));


// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use(express.static('thumbnails'));
// app.use('/blogs', express.static('images/blogs'));
// app.use('/images', express.static('images/blogs'));



// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
    } else {
        // pass on to another error handler
        next(err);
    }
});


app.use("public/images/Advertisement",express.static("public/images/Advertisement"));

app.use("/public/profile",express.static("public/profile"));
// Run static setup
// app.use(express.static(path.join(__dirname, 'views/dist/frontend/browser')));
// app.get('*', function (req, res) {
//     return res.sendFile(path.join(__dirname, 'views/dist/frontend/browser', 'index.html'));
// });
app.use(express.static(path.join(__dirname, 'views/dist')));
app.get('*', function (req, res) {
    return res.sendFile(path.join(__dirname, 'views/dist', 'index.html'));
});
// check mongose connection
DB.connection();
// create server connection

//Without SSL
const server = http.createServer(app);

// With SSL
// const options = {
//     key: require('fs').readFileSync(__dirname + '/test.key'),
//     cert: require('fs').readFileSync(__dirname + '/test.crt')
//   };
//   const server = https.createServer(options, app);

// Start the app by listening on the default Heroku port
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
