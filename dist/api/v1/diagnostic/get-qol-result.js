"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-qol-result.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/diagnostic/qol/result:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: search-config list api
 *   description: API used to Search Config List
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add declaration
 *         properties:
 *           QOL_value:
 *             type: string
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/diagnostic/qol/result", _qol.getQolResult);
var _default = app;
exports.default = _default;