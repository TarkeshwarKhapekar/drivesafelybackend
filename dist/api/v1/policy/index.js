"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addPolicy = _interopRequireDefault(require("./add-policy"));
var _getPolicy = _interopRequireDefault(require("./get-policy"));
var _updatePolicy = _interopRequireDefault(require("./update-policy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all policy routers.
 * @author: Siddhant Singh
 */
var _default = [_addPolicy.default, _getPolicy.default, _updatePolicy.default];
exports.default = _default;