"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addReflex = _interopRequireDefault(require("./add-reflex"));
var _getReflex = _interopRequireDefault(require("./get-reflex"));
var _updateReflex = _interopRequireDefault(require("./update-reflex"));
var _deleteReflexImage = _interopRequireDefault(require("./delete-reflex-image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all reflex routers.
 * @author: Siddhant Singh
 */
var _default = [_addReflex.default, _getReflex.default, _updateReflex.default, _deleteReflexImage.default];
exports.default = _default;