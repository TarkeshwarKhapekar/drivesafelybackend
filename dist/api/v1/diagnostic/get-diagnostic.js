"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _diagnostic = require("../../../controllers/diagnostic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-diagnostic.js
 * @description: It Contain get diagnostic by id router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/diagnostic/get-diagnostic/{id}:
 *  get:
 *   tags: ["Diagnostic"]
 *   summary: get-diagnostic list api
 *   description: API used to Get Diagnostic
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

app.get("/diagnostic/get-diagnostic/:id", _diagnostic.getDiagnostic);
var _default = app;
exports.default = _default;