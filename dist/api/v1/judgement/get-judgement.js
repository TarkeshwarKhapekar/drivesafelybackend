"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _judgement = require("../../../controllers/judgement");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-judgement.js
 * @description: It Contain get judgement by id router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/judgement/get-config/{id}:
 *  get:
 *   tags: ["Judgement Management"]
 *   summary: get-judgement list api
 *   description: API used to Get Judgement
 *   parameters:
 *     - in: path
 *       name: id
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/judgement/get-config/:id", _judgement.get);
var _default = app;
exports.default = _default;