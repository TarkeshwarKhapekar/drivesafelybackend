"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _weightageScore = require("../../../controllers/weightageScore");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-weightage.js
 * @description: It Contain add weightageScore  router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/weightage/add-weightageScore:
 *  post:
 *   tags: ["Weightage Score"]
 *   summary: add weightage score api
 *   description: API used to Add Weightage Score
 *   parameters:
 *      - in: body
 *        name: weightage score
 *        description: The weightage score to create.
 *        schema:
 *         type: object
 *         required:
 *          - add weightage score
 *         properties:
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

// const corporateSchema = Joi.object({

// });

app.post("/weightage/add-weightageScore", _weightageScore.addWeightageScore);
var _default = app;
exports.default = _default;