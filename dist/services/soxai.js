"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soxaiLogin = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = _interopRequireDefault(require("../collections/user"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _universal = require("../utilities/universal");
var COMMON = _interopRequireWildcard(require("./common"));
var Mail = _interopRequireWildcard(require("../utilities/mail"));
var _config = _interopRequireDefault(require("config"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: USERMODEL.js
 * @description: It Contain function layer for user service.
 * @author: Pankaj Chaudhari
 */

async function getRingToken(email, password) {
  const axios = require('axios');
  let token;
  const payload = {
    "email": email,
    "password": password,
    "returnSecureToken": true
  };
  const url = "https://soxai-firebase.df.r.appspot.com/api/login";
  try {
    const response = await axios.post(url, payload);
    token = response.data.refreshToken;
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  // console.log(token);
  return token;
}

/********** Login users **********/
const soxaiLogin = async (payload, res) => {
  const {
    email,
    password
  } = payload;
  console.log(payload, "payload344");
  const userId = payload.userId;
  // Check if the provided credentials match any user in the database

  const token = await getRingToken(email, password);
  console.log("token", token);

  // update profile

  const query = {
    _id: _mongoose.default.Types.ObjectId(userId)
  };
  let data = {
    ringToken: {
      token: token,
      lastLogin: new Date()
    }
  };
  let saveUser = await _user.default.findOneAndUpdate(query, data, {
    fields: {
      loginToken: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0
    },
    new: true
  });

  // If the login is successful, construct the response with the static data
  const response = {
    refreshToken: token
  };
  return response;
};
exports.soxaiLogin = soxaiLogin;