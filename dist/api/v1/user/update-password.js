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
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
/**
 * @swagger
 * /api/v1/user/update-password:
 *  post:
 *   tags: ["User"]
 *   summary: update password
 *   description: api used to reset password
 *   parameters:
 *      - in: header
 *        name: authorization
 *        required:
 *      - in: body
 *        name: user
 *        description: api used update password
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           _id:
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
  //   currentpwd: Joi.string()
  //   .required()
  //   .label("Old Password"),
  //   password: Joi.string()
  //   .required()
  //   .label("New Password"),
  //   confirmPassword: Joi.string()
  //   .required()
  //   .label("Confirm Password")
});
app.post("/user/update-password",
//   validator.body(userSchema, {
//     joi: { convert: true, allowUnknown: false }
//   }),
//   checkToken,
_user.updatePassword);
var _default = app;
exports.default = _default;