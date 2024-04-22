"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _soxai = require("../../../controllers/soxai");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: login-soxai.js
 * @description: It Contain soxai login router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/soxai/user/login:
 *  post:
 *   tags: ["SOXAI"]
 *   summary: soxai user login api
 *   description: api used to soxai login users
 *   parameters:
 *      - in: header
 *        name: authorization
 *      - in: body
 *        name: user
 *        description: The soxai user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/soxai/user/login", _universal.checkToken, _soxai.soxaiLogin);
var _default = app;
exports.default = _default;