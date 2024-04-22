"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _policy = require("../../../controllers/policy");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-qol.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/policy/get-All-Policy:
 *  get:
 *   tags: ["Policy"]
 *   summary: get-policy list api
 *   description: API used to Get policy
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/policy/get-All-Policy", _policy.getAllPolicy);
var _default = app;
exports.default = _default;