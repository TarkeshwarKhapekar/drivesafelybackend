"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addJudgement = _interopRequireDefault(require("./add-judgement"));
var _getAllJudgements = _interopRequireDefault(require("./get-all-judgements"));
var _updateJudgement = _interopRequireDefault(require("./update-judgement"));
var _getJudgement = _interopRequireDefault(require("./get-judgement"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all judgement routers.
 * @author: Pankaj Chaudhari
 */
var _default = [_addJudgement.default, _getAllJudgements.default, _updateJudgement.default, _getJudgement.default];
exports.default = _default;