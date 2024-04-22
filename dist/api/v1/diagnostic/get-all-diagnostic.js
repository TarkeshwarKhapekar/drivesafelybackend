"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _diagnostic = require("../../../controllers/diagnostic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-diagnostic.js
 * @description: It Contain get all diagnostic by id router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/diagnostic/get-all-diagnostic:
 *  get:
 *   tags: ["Diagnostic"]
 *   summary: get-all-diagnostic list api
 *   description: API used to Get All Diagnostic
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/diagnostic/get-all-diagnostic", _diagnostic.getAllDiagnosticByUser);
var _default = app;
exports.default = _default;