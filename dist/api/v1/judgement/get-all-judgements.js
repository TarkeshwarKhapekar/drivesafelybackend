"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _judgement = require("../../../controllers/judgement");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: judgement.js
 * @description: It Contain get judgement's  router/api.
 * @author: Pankaj Chaudhari
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/judgement/get-All-config:
 *  get:
 *   tags: ["Judgement Management"]
 *   summary: get-config list api
 *   description: API used to Get Content
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/judgement/get-All-config", _judgement.getAll);
var _default = app;
exports.default = _default;