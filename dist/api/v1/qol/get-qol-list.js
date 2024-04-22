"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-qol.js
 * @description: It Contain register qol router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/qol/search-config-list:
 *  post:
 *   tags: ["Qol Management"]
 *   summary: get-qol list api
 *   description: API used to Get Qol List
 *   parameters:
 *     - in: formData
 *       name: value
 *       type: number
 *       required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/qol/search-config-list", _qol.getQolList);
var _default = app;
exports.default = _default;