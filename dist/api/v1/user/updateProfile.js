"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _user = require("../../../controllers/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: updateProfile.js
 * @description: It Contain updateProfile User  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/user/update-profile:
 *  post:
 *   tags: ["User"]
 *   summary: user register api
 *   description: api used to register users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user register
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           name:
 *             type: string
 *             required: false
 *           email:
 *             type: string
 *             required:  false
 *           phone:
 *             type: string
 *             required:  false
 *           gender:
 *             type: string
 *             enum: ["MALE", "FEMALE", "OTHER"]
 *             required:  false
 *           password:
 *             type: string
 *             required:  false
 *           confirm_password:
 *             type: string
 *             required:
 *           status:
 *              type: string
 *              required: false
 *              enum: ['active', 'deactive']
 *              default: 'active'
 *           deviceType:
 *              type: string
 *              required: true
 *              enum: ['web', 'ios', 'android']
 *              default: 'web'
 *           language:
 *              type: string
 *              required: false
 *              enum: ['English', 'Japanese']
 *              default: 'English'
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = _joi.default.object({
  name: _joi.default.string().required().label("user name"),
  t_c: _joi.default.boolean().optional().allow("").label("t_c"),
  email: _joi.default.string().email().required().label("Email"),
  password: _joi.default.string().trim().required().label("Password"),
  confirm_password: _joi.default.string().optional().allow("").label("Confirm Password")
});
app.post("/user/update-profile",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_user.updateProfile);
var _default = app;
exports.default = _default;