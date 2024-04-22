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
 * @file: logout.js
 * @description: It Contain logout router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/user/logout:
 *  post:
 *   tags: ["User"]
 *   summary: user logout api
 *   description: api used to logout users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/user/logout", _universal.checkToken, _user.logout);
var _default = app;
exports.default = _default;