"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addContent = _interopRequireDefault(require("./add-content"));
var _getContent = _interopRequireDefault(require("./get-content"));
var _getAllContent = _interopRequireDefault(require("./get-all-content"));
var _updateContent = _interopRequireDefault(require("./update-content"));
var _deleteContent = _interopRequireDefault(require("./delete-content"));
var _getContentByType = _interopRequireDefault(require("./get-content-byType"));
var _getAllContentAdvertismentDrivingsafety = _interopRequireDefault(require("./get-all-content-advertisment-drivingsafety"));
var _deleteContentImage = _interopRequireDefault(require("./delete-content-image"));
var _deleteContentVideo = _interopRequireDefault(require("./delete-content-video"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all content routers.
 * @author: Manas Agrawal
 */
var _default = [_addContent.default, _getContent.default, _getAllContent.default, _updateContent.default, _deleteContent.default, _getContentByType.default, _getAllContentAdvertismentDrivingsafety.default, _deleteContentImage.default, _deleteContentVideo.default];
exports.default = _default;