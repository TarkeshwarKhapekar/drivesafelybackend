"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _weightageScore = require("../../../controllers/weightageScore");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-weightage-score.js
 * @description: It Contain register weightage score router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/score/get-weightage-score:
 *  get:
 *   tags: ["Weightage Score"]
 *   summary: get-weightage-score list api
 *   description: API used to Get weightage-score
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/score/get-weightage-score", _weightageScore.getWeightageScore);
var _default = app;
exports.default = _default;