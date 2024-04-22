"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _content = require("../../../controllers/content");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: delete-content-image.js
 * @description: It Contain delete content image router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/delete/content-image:
 *  delete:
 *   tags: ["Content Management"]
 *   summary: Content image delete  api
 *   description: API used to Delete content image
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

app.delete("/delete/content-image", _content.deleteContentImage);
var _default = app;
exports.default = _default;