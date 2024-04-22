"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-qol-video.js
 * @description: It Contain delete qol video router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/delete/qol-video:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: Qol video delete  api
 *   description: API used to Delete Qol video
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: videos
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

app.delete("/delete/qol-video", _qol.deleteQolVideo);
var _default = app;
exports.default = _default;