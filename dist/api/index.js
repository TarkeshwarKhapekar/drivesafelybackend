"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("./v1/user"));
var _notification = _interopRequireDefault(require("./v1/notification"));
var _diagnostic = _interopRequireDefault(require("./v1/diagnostic"));
var _content_management = _interopRequireDefault(require("./v1/content_management"));
var _questionnaire = _interopRequireDefault(require("./v1/questionnaire"));
var _corporate_master = _interopRequireDefault(require("./v1/corporate_master"));
var _qol = _interopRequireDefault(require("./v1/qol"));
var _policy = _interopRequireDefault(require("./v1/policy"));
var _judgement = _interopRequireDefault(require("./v1/judgement"));
var _weightageScore = _interopRequireDefault(require("./v1/weightageScore"));
var _SOXAI = _interopRequireDefault(require("./v1/SOXAI"));
var _reflex = _interopRequireDefault(require("./v1/reflex"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Pankaj Chaudhari
 */
/*********** Combine all Routes ********************/
var _default = [..._user.default, ..._notification.default, ..._diagnostic.default, ..._content_management.default, ..._diagnostic.default, ..._questionnaire.default, ..._corporate_master.default, ..._qol.default, ..._policy.default, ..._judgement.default, ..._weightageScore.default, ..._SOXAI.default, ..._reflex.default];
exports.default = _default;