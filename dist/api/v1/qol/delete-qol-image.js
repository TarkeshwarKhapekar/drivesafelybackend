"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-image.js
 * @description: It Contain delete qol image router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/delete/qol-image:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: Qol image delete  api
 *   description: API used to Delete Qol image
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: images
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

app.delete("/delete/qol-image", _qol.deleteQolImage);
var _default = app;
exports.default = _default;