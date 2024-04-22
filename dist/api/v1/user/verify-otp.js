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
 * @file: verify-otp.js
 * @description: It Contain otp verify router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
// https://swagger.io/docs/specification/2-0/describing-parameters
/**
 * @swagger
 * /api/v1/user/verify-otp:
 *  post:
 *   tags: ["User"]
 *   summary: update user status api
 *   description: Api to used Update the status of user
 *   parameters:
 *      - in: body
 *        name: user
 *        description: Api to used Update the status of user
 *        schema:
 *         type: object
 *         required:
 *          - Verify OTP
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           otp:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */
const userSchema = _joi.default.object({
  //   id: Joi.string()
  //         .required()
  //         .label("Id"),
  //   status: Joi.boolean().required()
});
app.post("/user/verify-otp",
//   validator.body(userSchema, {
//     joi: { convert: true, allowUnknown: false }
//   }),
//   checkToken,
_user.verifyOTP);
var _default = app;
exports.default = _default;