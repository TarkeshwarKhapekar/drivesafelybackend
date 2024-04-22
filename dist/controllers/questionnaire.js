"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuestion = exports.getQuestion = exports.getAllQuestionsCount = exports.getAllQuestionsBycount = exports.getAllQuestions = exports.deleteQuestion = exports.addQuestion = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/questionnaire"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: questionnnaire.js
 * @description: It Contain function layer for questionnaire controller.
 * @author: Pankaj Chaudhari
 */

/**************** Add Notification ***********/
const addQuestion = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveQuestion(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.questionAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get notification by id ***********/
exports.addQuestion = addQuestion;
const getQuestion = async (req, res, next) => {
  const payload = req.params;
  console.log(payload);
  try {
    const result = await SERVICE.getQuestion(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get all questions ***********/
exports.getQuestion = getQuestion;
const getAllQuestions = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllQuestions(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Get all questions by count ***********/
exports.getAllQuestions = getAllQuestions;
const getAllQuestionsBycount = async (req, res, next) => {
  const payload = req.params;
  console.log(payload);
  try {
    const data = await SERVICE.getAllQuestionsBycount(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

// /**************** Delete notification ***********/
exports.getAllQuestionsBycount = getAllQuestionsBycount;
const deleteQuestion = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteQuestion(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.questionRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update question ***********/
exports.deleteQuestion = deleteQuestion;
const updateQuestion = async (req, res, next) => {
  try {
    const data = await SERVICE.updateQuestion(req.body);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.questionUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.updateQuestion = updateQuestion;
const getAllQuestionsCount = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllQuestionsCount({});
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.getAllQuestionsCount = getAllQuestionsCount;