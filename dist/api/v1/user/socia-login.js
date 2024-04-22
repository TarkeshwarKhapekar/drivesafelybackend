"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _user = require("../../../controllers/user");
var _constants = require("../../../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: social-login.js
 * @description: It Contain login router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * 
 * /api/v1/user/social-login:
 *  post:
 *   tags: ["User"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           socialToken:
 *             type: string
 *             required:
 *           email:
 *             type: string
 *             required:
 *           roles:
 *             type: string
 *             required:
 *           loginType:
 *             type: string
 *             required:
 *           termsCondition:
 *             type: boolean
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = _joi.default.object({
  socialToken: _joi.default.string().required().label("Social Token"),
  roles: _joi.default.string().required().label("Role"),
  email: _joi.default.string().email().required().label("Email"),
  termsCondition: _joi.default.boolean().optional().allow(""),
  loginType: _joi.default.string().required().label("Login Type").valid("google", "facebook", "apple")
});
app.post("/user/social-login", validator.body(userSchema, {
  joi: {
    convert: true,
    allowUnknown: false
  }
}), _user.socialLogin);
var _default = app;
exports.default = _default;