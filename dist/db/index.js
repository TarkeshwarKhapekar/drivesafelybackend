"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It Contain db setup function.
 * @author: Pankaj Chaudhari
 */

// const { auth, name, host, username, password, port ,databaseUrl} = config.get('db');
const {
  auth,
  name,
  host,
  username,
  password,
  port
} = _config.default.get('db');
const databaseUrl = auth ? `mongodb://${username}:${password}@${host}:${port}/${name}` : `mongodb://${host}:${port}/${name}`;

// Mongose setup with server
console.log(auth);
console.log("databaseUrl", databaseUrl);
_mongoose.default.connect(databaseUrl, {
  'useCreateIndex': true,
  'useNewUrlParser': true,
  'useUnifiedTopology': true,
  'useFindAndModify': false
});
const connection = () => {
  _mongoose.default.connection.on('connected', function () {
    console.log('Mongoose connected! ');
  });
};
exports.connection = connection;