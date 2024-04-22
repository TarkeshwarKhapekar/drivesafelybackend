"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _diagnostic = require("../../../controllers/diagnostic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-declaration.js
 * @description: It Contain delete declaration router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/declaration/delete/{id}:
 *  delete:
 *   tags: ["Declaration"]
 *   summary: declaration delete  api
 *   description: API used to Delete Declaration
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.delete("/declaration/delete/:id", _diagnostic.deleteDeclaration);
var _default = app;
exports.default = _default;