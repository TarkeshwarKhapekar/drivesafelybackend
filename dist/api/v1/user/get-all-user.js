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
 * @file: get-all-user.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/user/get-all-user:
 *  get:
 *   tags: ["User"]
 *   summary: get-all-user list api
 *   description: api used to get users type list
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/user/get-all-user", _universal.checkToken, _user.getAllUser);
var _default = app;
exports.default = _default;