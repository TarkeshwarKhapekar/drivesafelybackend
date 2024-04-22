"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _multer2 = require("../../../utilities/multer");
var _judgement = require("../../../controllers/judgement");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-judgement.js
 * @description: It Contain qol  router/api.
 * @author: Pankaj Chaudhari
 */

const upload = (0, _multer.default)({
  storage: _multer2.storage
});
const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/judgement/update-config: 
 *  post:
 *   tags: ["Judgement Management"]
 *   summary: add config api
 *   description: API used to Add Config
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: min_value
 *        description: The type of config.
 *        type: number
 *        required: false
 *      - in: formData
 *        name: max_value
 *        description: The type of config.
 *        type: number
 *        required: false 
 *      - in: formData
 *        name: colorCode
 *        description: The colorCode of config.
 *        type: string
 *      - in: formData
 *        name: level
 *        description: The type of config.
 *        type: string
 *        required: false 
 *      - in: formData
 *        name: description
 *        description: The type of config.
 *        type: string
 *        required: false 
 *      - in: formData
 *        name: title
 *        description: The title of config.
 *        type: string
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/judgement/update-config", _judgement.update);
var _default = app;
exports.default = _default;