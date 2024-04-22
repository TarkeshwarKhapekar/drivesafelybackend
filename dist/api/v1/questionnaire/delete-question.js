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
 * @file: delete-question.js
 * @description: It Contain delete question router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/questionnaire/delete/{id}:
 *  delete:
 *   tags: ["MCQ"]
 *   summary: question delete  api
 *   description: API used to Delete Question
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *         description: The question ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = _joi.default.object({
  id: _joi.default.string().required().label("Id")
});
app.delete("/questionnaire/delete/:id",
// validator.params(Schema, {
//   joi: { convert: true, allowUnknown: false }
// }),
//   checkToken,
_questionnaire.deleteQuestion);
var _default = app;
exports.default = _default;