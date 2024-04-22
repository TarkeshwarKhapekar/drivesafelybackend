"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _diagnostic = require("../../../controllers/diagnostic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-observation.js
 * @description: It Contain add Observation router/api.
 * @author: Pankaj Chaudhari    
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/questionnaire/add-questionnaire-feedback:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add observation api
 *   description: API used to Add Observation
 *   parameters:
 *      - in: body
 *        name: observation
 *        description: The observation to create.
 *        schema:
 *         type: object
 *         required:
 *          - add observation
 *         properties:
 *           declarationId:
 *             type: string
 *             required: true 
 *           count:
 *             type: number
 *             required: true 
 *           response:
 *             type: array
 *             items: 
 *                type: object
 *                properties:
 *                     questionName:
 *                       type: string
 *                       required: true
 *                     ansType:
 *                      type: string
 *                      required: true
 *                     options:
 *                        type: array
 *                        items: 
 *                           type: object
 *                           properties:
 *                                name:
 *                                 type: string
 *                                 required:
 *                                scoreVal:
 *                                 type: number
 *                                 required:
 *                                selected:
 *                                 type: boolean
 *                                 default: false
 *                                 required: 
 *                             
 *                      
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const declarationSchema = _joi.default.object({});
app.post("/questionnaire/add-questionnaire-feedback",
// validator.body(declarationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_diagnostic.saveQuestionnaireFeedback);
var _default = app;
exports.default = _default;