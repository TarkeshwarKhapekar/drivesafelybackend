"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-qol.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/qol/get-All-Config:
 *  get:
 *   tags: ["Qol Management"]
 *   summary: get-config list api
 *   description: API used to Get Qol
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/qol/get-All-Config", _qol.getAllQol);
var _default = app;
exports.default = _default;