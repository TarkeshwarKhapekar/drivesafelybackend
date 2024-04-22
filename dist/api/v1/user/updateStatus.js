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
 * @file: login.js
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
 * /api/v1/user/updateStatus:
 *  put:
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
 *          - Admin login
 *         properties:
 *           id:
 *             type: string
 *             required:
 *           status:
 *             type: boolean
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */
const userSchema = _joi.default.object({
  id: _joi.default.string().required().label("Id"),
  status: _joi.default.boolean().required()
});
app.put("/user/updateStatus", validator.body(userSchema, {
  joi: {
    convert: true,
    allowUnknown: false
  }
}), _universal.checkToken, _user.updateStatus);
var _default = app;
exports.default = _default;