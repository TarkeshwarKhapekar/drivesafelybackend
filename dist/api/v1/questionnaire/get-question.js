"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _questionnaire = require("../../../controllers/questionnaire");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-question.js
 * @description: It Contain get question by id  router/api.
 * @author:  Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/questionnaire/get-question/{id}:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-questionnaire  api
 *   description:  API used to Get Question
 *   parameters:
 *     - in: path
 *       name: id
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-question/:id",
// checkToken,
_questionnaire.getQuestion);
var _default = app;
exports.default = _default;