"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _content = require("../../../controllers/content");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-content-video.js
 * @description: It Contain delete content video router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/delete/content-video:
 *  delete:
 *   tags: ["Content Management"]
 *   summary: Content video delete  api
 *   description: API used to Delete content video
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

app.delete("/delete/content-video", _content.deleteContentVideo);
var _default = app;
exports.default = _default;