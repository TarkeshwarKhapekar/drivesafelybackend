"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _register = _interopRequireDefault(require("./register"));
var _login = _interopRequireDefault(require("./login"));
var _logout = _interopRequireDefault(require("./logout"));
var _updateProfile = _interopRequireDefault(require("./updateProfile"));
var _forgotPassword = _interopRequireDefault(require("./forgot-password"));
var _updatePassword = _interopRequireDefault(require("./update-password"));
var _verifyOtp = _interopRequireDefault(require("./verify-otp"));
var _getProfile = _interopRequireDefault(require("./get-profile"));
var _imgupload = _interopRequireDefault(require("./imgupload"));
var _getAllUser = _interopRequireDefault(require("./get-all-user"));
var _updateStatus = _interopRequireDefault(require("./updateStatus"));
var _deleteUser = _interopRequireDefault(require("./delete-user"));
var _sociaLogin = _interopRequireDefault(require("./socia-login"));
var _changePassword = _interopRequireDefault(require("./change-password"));
var _imgBase64Upload = _interopRequireDefault(require("./imgBase64Upload"));
var _statistics = _interopRequireDefault(require("./statistics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: Pankaj Chaudhari
 */
var _default = [_register.default, _login.default, _logout.default, _updateProfile.default, _forgotPassword.default, _getProfile.default, _imgupload.default, _imgBase64Upload.default, _getAllUser.default, _updateStatus.default, _changePassword.default, _verifyOtp.default, _updatePassword.default, _deleteUser.default, _statistics.default];
exports.default = _default;