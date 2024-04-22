"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addWeightage = _interopRequireDefault(require("./add-weightage"));
var _getWeightageScore = _interopRequireDefault(require("./get-weightage-score"));
var _updateScore = _interopRequireDefault(require("./update-score"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all weightage routers.
 * @author: Siddhant Singh 
 */
var _default = [_addWeightage.default, _getWeightageScore.default, _updateScore.default];
exports.default = _default;