"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _config = _interopRequireDefault(require("config"));
var DB = _interopRequireWildcard(require("./db"));
var _swaggerConfig = _interopRequireDefault(require("./swagger-config"));
var _api = _interopRequireDefault(require("./api"));
var _response = require("./utilities/response");
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _scheduler = _interopRequireDefault(require("./utilities/scheduler"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: app.js
 * @description: It Contain server setup function.
 * @author: Pankaj Chaudhari
 */

const {
  port
} = _config.default.get('app');
const imagePath = "./public/uploads/images/";
const fs = require('fs');
const app = (0, _express.default)();
const http = require('http');
const https = require('https');
// app.use(fileUpload());
// Access-Control-Allow-Origin
app.use((0, _cors.default)());
// parse application/x-www-form-urlencoded
app.use(_bodyParser.default.json({
  limit: "50mb"
}));
app.use(_bodyParser.default.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
// parse application/json
app.use(_bodyParser.default.json());
/*********** Swagger UI setup ********************/
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swaggerConfig.default));
/*********** All Routes ********************/
app.use('/api/v1', _api.default);
console.log("__dirname ---->", __dirname);
// console.log("__dirname ---->", __dirname +"/"+ "../public/images");

//Live
//app.use(express.static(path.join("/home/ubuntu/welness/public/images")));

//Test server
// app.use(express.static(path.join("/home/ubuntu/development/ranjeet/public/images")));
// app.use(express.static(path.join("home/pankajchaudhari/OfficalData/Driving%20Safety/Code/drivingsafety_backend/public/images/blogs")));

// Function to serve all static files
// inside public directory.
app.use(_express.default.static('public'));
app.use(_express.default.static('thumbnails'));
// app.use('/blogs', express.static('images/blogs'));
// app.use('/images', express.static('images/blogs'));

// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json((0, _response.failAction)(err.error.message.toString().replace(/[\""]+/g, "")));
  } else {
    // pass on to another error handler
    next(err);
  }
});
app.use("public/images/Advertisement", _express.default.static("public/images/Advertisement"));
app.use("/public/profile", _express.default.static("public/profile"));
// Run static setup
// app.use(express.static(path.join(__dirname, 'views/dist/frontend/browser')));
// app.get('*', function (req, res) {
//     return res.sendFile(path.join(__dirname, 'views/dist/frontend/browser', 'index.html'));
// });
app.use(_express.default.static(_path.default.join(__dirname, 'views/dist')));
app.get('*', function (req, res) {
  return res.sendFile(_path.default.join(__dirname, 'views/dist', 'index.html'));
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