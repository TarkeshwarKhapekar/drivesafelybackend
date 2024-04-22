"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _weightageScore = require("../../../controllers/weightageScore");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-wightage-score.js
 * @description: It Contain update score router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/score/update-weightage-score:
 *  post:
 *   tags: ["Weightage Score"]
 *   summary: score update api
 *   description: API used to Update score
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The score to update.
 *        schema:
 *         type: object
 *         required:
 *          - score update
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           sleepScore:
 *             type: number
 *             required: false
 *           exerciseScore:
 *             type: number
 *             required: false
 *           stressScore:
 *             type: number
 *             required: false
 *           reflexScore:
 *             type: number
 *             required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/score/update-weightage-score", _weightageScore.updateWeightageScore);
var _default = app;
exports.default = _default;