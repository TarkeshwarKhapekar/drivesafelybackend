"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _reflex = require("../../../controllers/reflex");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-image.js
 * @description: It Contain delete reflex image router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/delete/reflex-image:
 *  delete:
 *   tags: ["Reflex Management"]
 *   summary: reflex image delete  api
 *   description: API used to Delete Reflex image
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: reflexscreen1
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *      - in: body
 *        name: reflexscreen2
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

app.delete("/delete/reflex-image", _reflex.deleteReflexImage);
var _default = app;
exports.default = _default;