"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addDeclaration = _interopRequireDefault(require("./add-declaration"));
var _getDeclation = _interopRequireDefault(require("./get-declation"));
var _getAllDeclaration = _interopRequireDefault(require("./get-all-declaration"));
var _updateDeclaration = _interopRequireDefault(require("./update-declaration"));
var _deleteDeclaration = _interopRequireDefault(require("./delete-declaration"));
var _addObservation = _interopRequireDefault(require("./add-observation"));
var _addReflection = _interopRequireDefault(require("./add-reflection"));
var _addQuestionnairefeedback = _interopRequireDefault(require("./add-questionnairefeedback"));
var _getDiagnostic = _interopRequireDefault(require("./get-diagnostic"));
var _getQolResult = _interopRequireDefault(require("./get-qol-result"));
var _getAllDiagnostic = _interopRequireDefault(require("./get-all-diagnostic"));
var _addSteps = _interopRequireDefault(require("./add-steps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all declaration routers.
 * @author: Manas Agrawal
 */
var _default = [_addDeclaration.default, _getDeclation.default, _getAllDeclaration.default, _addObservation.default, _addReflection.default, _addQuestionnairefeedback.default, _getDiagnostic.default, _getQolResult.default, _getAllDiagnostic.default, _addSteps.default
// updateDeclaration,
// deleteDeclaration
];
exports.default = _default;