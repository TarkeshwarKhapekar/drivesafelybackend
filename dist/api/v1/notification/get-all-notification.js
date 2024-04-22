"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _notification = require("../../../controllers/notification");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-notification.js
 * @description: It Contain get all notification list router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/notification/get-all-notification:
 *  get:
 *   tags: ["Notification"]
 *   summary: get-all-notification list api
 *   description: API used to Get Notification List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/notification/get-all-notification",
//   checkToken,
_notification.getAllNotification);
var _default = app;
exports.default = _default;