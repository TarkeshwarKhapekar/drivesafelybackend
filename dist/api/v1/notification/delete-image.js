"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _notification = require("../../../controllers/notification");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-image.js
 * @description: It Contain delete notification image router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/image/delete:
 *  delete:
 *   tags: ["Notification"]
 *   summary: notification delete  api
 *   description: API used to Delete Notification
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: image
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.delete("/image/delete", _notification.deleteImage);
var _default = app;
exports.default = _default;