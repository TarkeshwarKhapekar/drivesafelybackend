"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../../../controllers/user");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: statistics.js
 * @description: It Contain count of dashboard API's router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
app.get("/user/get-all-dashborad-data",
// checkToken,
_user.getDashboardData);
var _default = app;
exports.default = _default;