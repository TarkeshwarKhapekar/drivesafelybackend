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
 * @description: It Contain add Declaration  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/declaration/add-declaration:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add declaration api
 *   description: API used to Add Declaration
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add declaration
 *         properties:
 *           userId:
 *             type: string
 *             required: true 
 *           bedTime:
 *             type: string
 *             required: true 
 *           wake_upTime:
 *             type: string
 *             required: true 
 *           meal:
 *             type: array
 *             items:
 *                type: string
 *           physical_condition:
 *             type: string
 *             required: true
 *             enum: ["Good", "Bad"]
 *           fatigue_existence:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           do_meditation:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           memo:
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const declarationSchema = _joi.default.object({});
app.post("/declaration/add-declaration",
// validator.body(declarationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_diagnostic.addDeclaration);
var _default = app;
exports.default = _default;