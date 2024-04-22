"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeStamp = exports.generateToken = exports.generateRandom = exports.encryptpassword = exports.decodeToken = exports.checkToken = void 0;
var _md = _interopRequireDefault(require("md5"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("config"));
var _response = require("./response");
var _messages = _interopRequireDefault(require("./messages"));
var _user = _interopRequireDefault(require("./../collections/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Pankaj Chaudhari
 */

const {
  jwtAlgo,
  jwtKey
} = _config.default.get("app");
const getTimeStamp = () => {
  return Date.now();
};

// password encryption.
exports.getTimeStamp = getTimeStamp;
const encryptpassword = password => {
  return (0, _md.default)(password);
};
// Generate random strings.
exports.encryptpassword = encryptpassword;
const generateRandom = (length = 32, alphanumeric = true) => {
  let data = "",
    keys = "";
  if (alphanumeric) {
    keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  } else {
    keys = "0123456789";
  }
  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};
/*********** Generate JWT token *************/
exports.generateRandom = generateRandom;
const generateToken = data => _jsonwebtoken.default.sign(data, jwtKey, {
  algorithm: jwtAlgo,
  expiresIn: "90d"
});
/*********** Decode JWT token *************/
exports.generateToken = generateToken;
const decodeToken = token => _jsonwebtoken.default.verify(token, jwtKey);
/*********** Verify token *************/
exports.decodeToken = decodeToken;
const checkToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = _jsonwebtoken.default.verify(token, jwtKey);
    // console.log("decoded")
    // console.log(decoded)
  } catch (err) {
    return res.status(401).json((0, _response.failAction)(_messages.default.tokenExpired, 401));
  }
  const user = await _user.default.checkToken(token);
  if (user) {
    req.user = {
      ...decoded,
      token
    };
    next();
  } else {
    res.status(401).json((0, _response.failAction)(_messages.default.unauthorizedUser, 401));
  }
};
exports.checkToken = checkToken;