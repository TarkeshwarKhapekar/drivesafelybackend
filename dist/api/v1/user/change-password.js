"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _user = require("../../../controllers/user");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: change-password.js
 * @description: It Contain login router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
// https://swagger.io/docs/specification/2-0/describing-parameters
/**
 * @swagger
 * /api/v1/user/change-password:
 *  post:
 *   tags: ["User"]
 *   summary: Check current password
 *   description: api used Check current password
 *   parameters:
 *      - in: header
 *        name: authorization
 *        required:
 *      - in: body
 *        name: user
 *        description: api used Check current password
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           currentpwd:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           confirmPassword:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */
const userSchema = _joi.default.object({
  currentpwd: _joi.default.string().required().label("Old Password"),
  password: _joi.default.string().required().label("New Password"),
  confirmPassword: _joi.default.string().required().label("Confirm Password")
});
app.post("/user/change-password",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_universal.checkToken, _user.changePassword);
var _default = app;
exports.default = _default;