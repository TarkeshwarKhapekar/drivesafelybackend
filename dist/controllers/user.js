"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOTP = exports.updateStatus = exports.updateProfile = exports.updatePassword = exports.socialLogin = exports.registerUser = exports.logout = exports.login = exports.imgUpload = exports.imgMultipleUpload = exports.imgBase64Upload = exports.getProfile = exports.getDashboardData = exports.getAllUser = exports.forgotPassword = exports.deleteUser = exports.changePassword = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/user"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _user2 = _interopRequireDefault(require("../collections/user"));
var _notification = _interopRequireDefault(require("../collections/notification"));
var _constants = require("../utilities/constants");
var _judgmentResult = _interopRequireDefault(require("../collections/judgmentResult"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Pankaj Chaudhari
 */

/**************** Add User ***********/
const registerUser = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.save(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.userAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add User ***********/
exports.registerUser = registerUser;
const socialLogin = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.socialReg(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Login user ***********/
exports.socialLogin = socialLogin;
const login = async (req, res, next) => {
  const payload = req.body;
  console.log(payload);
  try {
    const data = await SERVICE.onLogin(payload);
    res.status(200).json((0, _response.successAction)(data, _messages.default.success));
  } catch (error) {
    res.status(200).json((0, _response.failAction)(error.message));
  }
};

/** Function to verify the OTP and update it **/
exports.login = login;
const verifyOTP = async (req, res, next) => {
  try {
    const otp = req.body.otp;
    const payload = req.body;
    if (!otp) {
      return {
        status: 400,
        success: false,
        message: "OTP required"
      };
    }
    const data = await SERVICE.verifyOTP(payload);
    res.status(200).json((0, _response.successAction)(data, _messages.default.success));
  } catch (err) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/** Forgot pasword **/
exports.verifyOTP = verifyOTP;
const forgotPassword = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await SERVICE.paswordForgot(payload);
    res.json((0, _response.successAction)(data, _messages.default.emailSend));
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/* Update Password */
exports.forgotPassword = forgotPassword;
const updatePassword = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await SERVICE.updatePassword(payload);
    res.json((0, _response.successAction)(data, _messages.default.passwordUpdated));
  } catch (err) {}
};

/**************** Logout user ***********/
exports.updatePassword = updatePassword;
const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await SERVICE.logoutUser(payload);
    res.status(200).json((0, _response.successAction)(null, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Update User ***********/
exports.logout = logout;
const updateProfile = async (req, res, next) => {
  try {
    const rest = await SERVICE.updateProfile(req);
    res.status(200).json((0, _response.successAction)(rest, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Delete user ***********/
exports.updateProfile = updateProfile;
const deleteUser = async (req, res, next) => {
  console.log("checkkkk", req.params);
  try {
    const data = await SERVICE.deleteUser(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.userRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Add User ***********/
exports.deleteUser = deleteUser;
const imgBase64Upload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgBase64Upload(req);
    res.status(200).json((0, _response.successAction)(rest, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add User ***********/
exports.imgBase64Upload = imgBase64Upload;
const imgUpload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgUpload(req);
    res.status(200).json((0, _response.successAction)(rest, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.imgUpload = imgUpload;
const imgMultipleUpload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgMultipleUpload(req);
    res.status(200).json((0, _response.successAction)(rest, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.imgMultipleUpload = imgMultipleUpload;
const getProfile = async (req, res, next) => {
  const payload = req.params;
  try {
    const rest = await SERVICE.getProfile(payload);
    res.status(200).json((0, _response.successAction)(rest, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
/* Get all Promotion */
exports.getProfile = getProfile;
const getAllUser = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllUser(req.query, req.user);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
/* Update Promotion based on id */
exports.getAllUser = getAllUser;
const updateStatus = async (req, res, next) => {
  try {
    const data = await SERVICE.updateStatus(req.body);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/*** change password **/
exports.updateStatus = updateStatus;
const changePassword = async (req, res, next) => {
  let payload = req.body;
  try {
    const data = await SERVICE.changePassword(req.user.userId, payload);
    if (data.status == 200) {
      res.status(200).json((0, _response.successAction)(_messages.default.passwordUpdated));
    } else {
      res.status(200).json((0, _response.failAction)(_messages.default.invalidPassword));
    }
  } catch (error) {
    res.status(500).json((0, _response.failAction)(error.message));
  }
};
exports.changePassword = changePassword;
const getDashboardData = async (req, res, next) => {
  try {
    const totalDrivers = await _user2.default.find({
      isDeleted: false,
      roles: "DRIVER"
    }).countDocuments();
    const totalNotifications = await _notification.default.find({
      isDeleted: false
    }).countDocuments();
    const totalDiagnostics = await _judgmentResult.default.find({
      isDeleted: false
    }).countDocuments();
    const resultData = {
      Drivers: totalDrivers,
      Notifications: totalNotifications,
      Diagnostic: totalDiagnostics
    };
    res.status(200).json((0, _response.successAction)(resultData, _messages.default.getDashboardData));
  } catch (err) {
    res.status(500).json((0, _response.failAction)(err.message));
  }
};
exports.getDashboardData = getDashboardData;