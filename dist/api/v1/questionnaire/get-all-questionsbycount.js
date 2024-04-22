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
 * @file: get-all-questionsbycount.js
 * @description: It Contain get all questionnaired list router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/questionnaire/get-all-questionsBycount/{count}:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-all-questions list api
 *   description: API used to Get Questionnaire List
 *   parameters:
 *     - in: path
 *       name: count
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-all-questionsBycount/:id",
//   checkToken,
_questionnaire.getAllQuestionsBycount);
var _default = app;
exports.default = _default;