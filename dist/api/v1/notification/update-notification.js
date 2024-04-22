"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _notification = require("../../../controllers/notification");
var _multer2 = require("../../../utilities/multer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-notification.js
 * @description: It Contain update notification  router/api.
 * @author: Manas Agrawal
 */

const upload = (0, _multer.default)({
  storage: _multer2.storage
});
const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/notification/update-notification:
 *  post:
 *   tags: ["Notification"]
 *   summary: notification update api
 *   description: API used to Update Notification
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: id
 *        description: The type of notification.
 *        type: string
 *        required:
 *      - in: formData
 *        name: type
 *        description: The type of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        description: The title of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: message
 *        description: The message of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: image
 *        description: The image of notification.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const notificationSchema = _joi.default.object({
  message: _joi.default.string().required().label("message"),
  title: _joi.default.string().required().label("title")
});
app.post("/notification/update-notification", [upload.fields([{
  name: 'image',
  maxCount: 10
}])],
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_notification.updateNotification);
var _default = app;
exports.default = _default;