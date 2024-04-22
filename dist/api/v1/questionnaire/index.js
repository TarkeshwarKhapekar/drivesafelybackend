"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addQuestion = _interopRequireDefault(require("./add-question"));
var _getQuestion = _interopRequireDefault(require("./get-question"));
var _getAllQuestions = _interopRequireDefault(require("./get-all-questions"));
var _updateQuestion = _interopRequireDefault(require("./update-question"));
var _deleteQuestion = _interopRequireDefault(require("./delete-question"));
var _getAllQuestionsbycount = _interopRequireDefault(require("./get-all-questionsbycount"));
var _getQuestionCount = _interopRequireDefault(require("./get-question-count"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all notification routers.
 * @author: Pankaj Chaudhari
 */
var _default = [_addQuestion.default, _getQuestion.default, _getAllQuestions.default, _deleteQuestion.default, _updateQuestion.default, _getAllQuestionsbycount.default, _getQuestionCount.default];
exports.default = _default;