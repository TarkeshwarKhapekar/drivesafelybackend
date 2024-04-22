"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addQol = _interopRequireDefault(require("./add-qol"));
var _getAllQol = _interopRequireDefault(require("./get-all-qol"));
var _getQol = _interopRequireDefault(require("./get-qol"));
var _updateQol = _interopRequireDefault(require("./update-qol"));
var _deleteQol = _interopRequireDefault(require("./delete-qol"));
var _getQolList = _interopRequireDefault(require("./get-qol-list"));
var _deleteQolImage = _interopRequireDefault(require("./delete-qol-image"));
var _deleteQolVideo = _interopRequireDefault(require("./delete-qol-video"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all qol routers.
 * @author: Siddhant Singh
 */
var _default = [_addQol.default, _getAllQol.default, _getQol.default, _updateQol.default, _deleteQol.default, _deleteQolImage.default, _deleteQolVideo.default];
exports.default = _default;