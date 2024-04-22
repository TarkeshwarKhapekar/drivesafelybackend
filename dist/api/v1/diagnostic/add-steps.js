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
 * @file: add-declaration.js
 * @description: It Contain add steps  router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/steps/add-steps:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add steps api
 *   description: API used to Add Steps
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add steps
 *         properties:
 *           userId:
 *             type: string
 *             required: true 
 *           steps:
 *             type: number
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const declarationSchema = _joi.default.object({});
app.post("/steps/add-steps",
// validator.body(declarationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_diagnostic.addSteps);
var _default = app;
exports.default = _default;