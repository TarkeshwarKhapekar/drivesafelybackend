"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _content = require("../../../controllers/content");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-content.js
 * @description: It Contain register content  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/content/get-content-by-type/{type}:
 *  get:
 *   tags: ["Content Management"]
 *   summary: get-content-by-type list api
 *   description: API used to Get Content
 *   parameters:
 *     - in: path
 *       name: type
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/content/get-content-by-type/:type",
// checkToken,
_content.getContentByType);
var _default = app;
exports.default = _default;