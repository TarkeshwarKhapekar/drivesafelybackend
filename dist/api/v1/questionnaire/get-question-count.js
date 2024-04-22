"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _questionnaire = require("../../../controllers/questionnaire");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-questions.js
 * @description: It Contain get all questionnaired list router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/questionnaire/get-questions-count:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-all-questions count api
 *   description: API used to Get Questionnaire count
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-questions-count",
//   checkToken,
_questionnaire.getAllQuestionsCount);
var _default = app;
exports.default = _default;