"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _questionnaire = require("../../../controllers/questionnaire");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-question.js
 * @description: It Contain add question router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/questionnaire/add-question:
 *  post:
 *   tags: ["MCQ"]
 *   summary: add question api
 *   description: API used to Add question
 *   parameters:
 *      - in: body
 *        name: question
 *        description: The question to create.
 *        schema:
 *         type: object
 *         required:
 *          - add question
 *         properties:
 *           questionName:
 *             type: object
 *             properties:
 *                  en:
 *                    type: string
 *                    required:
 *                  ja:
 *                    type: string
 *                    required:    
 *           ansType:
 *             type: string
 *             required: false
 *           options:
 *             type: array
 *             items:
 *                type: object
 *                properties:
 *                     name:
 *                       type: object
 *                       properties:
 *                         en:
 *                           type: string
 *                           required:
 *                         ja:
 *                           type: string
 *                           required:
 *                     scoreVal:
 *                       type: number
 *                       required:      
 *             
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const notificationSchema = _joi.default.object({
  message: _joi.default.string().required().label("message"),
  title: _joi.default.string().required().label("title")
});
app.post("/questionnaire/add-question",
// validator.body(notificationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_questionnaire.addQuestion);
var _default = app;
exports.default = _default;