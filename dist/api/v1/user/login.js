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
 * @file: signinUser.js
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
 * /api/v1/user/signinUser:
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
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           deviceToken:
 *             type: string
 *             required:
 *           fcmToken:
 *             type: string
 *             required:
 *           loginType:
 *             type: string
 *             enum: ["ADMIN", "DRIVER", "STAFF"]   
 *             required: true
 *             default: "DRIVER"
 *           language:
 *             type: string
 *             enum: ["English", "Japaneses"]   
 *             required: false
 *             default: "English"
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = _joi.default.object({
  email: _joi.default.string().email().required().label("Email"),
  password: _joi.default.string().trim().required().label("Password"),
  loginType: _joi.default.string().trim().required().label("Type")
});
app.post("/user/signinUser",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_user.login);
var _default = app;
exports.default = _default;