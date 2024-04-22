"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _diagnostic = require("../../../controllers/diagnostic");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-declaration.js
 * @description: It Contain get all declaration list router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/declaration/get-all-declaration:
 *  get:
 *   tags: ["Declaration"]
 *   summary: get-all-declaration list api
 *   description: API used to Get Declaration List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/declaration/get-all-declaration",
//   checkToken,
_diagnostic.getAllDeclaration);
var _default = app;
exports.default = _default;