"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-qol.js
 * @description: It Contain delete qol router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/qol/delete/{id}:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: qol delete  api
 *   description: API used to Delete Qol
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

app.delete("/qol/delete/:id", _qol.deleteQol);
var _default = app;
exports.default = _default;