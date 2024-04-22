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
 * @file: register.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/user/register:
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
 *           name:
 *             type: string
 *             required: true
 *           email:
 *             type: string
 *             required:  true
 *           phone:
 *             type: string
 *             required:  true
 *           corporateCode:
 *             type: string
 *             required:  false
 *           yearOfBirth:
 *             type: number
 *             required:  false
 *           height:
 *             type: number
 *             required:  false
 *           weight:
 *             type: number
 *             required:  false
 *           restingHeartRate:
 *             type: number
 *             required:  false 
 *           ringUse:
 *             type: boolean
 *             default: false
 *             required:  false
 *           ringId:
 *             type: string
 *             required:  false
 *           gender:
 *             type: string
 *             enum: ["MALE", "FEMALE", "OTHER"]
 *             required:  true
 *           password:
 *             type: string
 *             required:  true
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
 *           deviceToken:
 *              type: string
 *              required: false 
 *           roles:
 *             type: string
 *             enum: ["ADMIN","SUBADMIN", "DRIVER", "STAFF"]   
 *             required: true
 *             default: "DRIVER"
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
  confirm_password: _joi.default.string().optional().allow("").label("Confirm Password"),
  roles: _joi.default.string().valid("U", "C", "SP").required().label("Roles")
});
app.post("/user/register",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_user.registerUser);
var _default = app;
exports.default = _default;