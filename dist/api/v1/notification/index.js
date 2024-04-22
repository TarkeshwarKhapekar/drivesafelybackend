"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addNotification = _interopRequireDefault(require("./add-notification"));
var _getNotification = _interopRequireDefault(require("./get-notification"));
var _getAllNotification = _interopRequireDefault(require("./get-all-notification"));
var _deleteNotification = _interopRequireDefault(require("./delete-notification"));
var _updateNotification = _interopRequireDefault(require("./update-notification"));
var _deleteImage = _interopRequireDefault(require("./delete-image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all notification routers.
 * @author: Manas Agrawal
 */
var _default = [_addNotification.default, _getNotification.default, _getAllNotification.default, _deleteNotification.default, _updateNotification.default, _deleteImage.default];
exports.default = _default;