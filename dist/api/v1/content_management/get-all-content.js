"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _content = require("../../../controllers/content");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-content.js
 * @description: It Contain get content list router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/content/get-all-content:
 *  get:
 *   tags: ["Content Management"]
 *   summary: get-all-content list api
 *   description: API used to Get Content List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/content/get-all-content",
//   checkToken,
_content.getAllContent);
var _default = app;
exports.default = _default;