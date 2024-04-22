"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _user = require("../../../controllers/user");
var _universal = require("../../../utilities/universal");
var _joi = _interopRequireDefault(require("@hapi/joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
const userSchema = _joi.default.object({
  image: _joi.default.string().required().label("Image"),
  imgLocation: _joi.default.string().required().label("Image location")
});
app.post("/user/imgBase64Upload", validator.body(userSchema, {
  joi: {
    convert: true,
    allowUnknown: false
  }
}), _universal.checkToken, _user.imgBase64Upload);
var _default = app;
exports.default = _default;