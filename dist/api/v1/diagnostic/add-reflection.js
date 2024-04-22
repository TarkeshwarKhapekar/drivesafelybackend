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
 * @file: add-reflection.js
 * @description: It Contain add Observation router/api.
 * @author: Pankaj Chaudhari    
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/reflexaction/add-reflexaction:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add reflexaction api
 *   description: API used to Add reflexaction
 *   parameters:
 *      - in: body
 *        name: reflexaction
 *        description: The reflexaction to create.
 *        schema:
 *         type: object
 *         required:
 *          - add observation
 *         properties:
 *           declarationId:
 *             type: string
 *             required: true 
 *           time:
 *             type: number
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

// const addReflection = Joi.object({

// });

app.post("/reflexaction/add-reflexaction",
// validator.body(declarationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_diagnostic.addReflection);
var _default = app;
exports.default = _default;