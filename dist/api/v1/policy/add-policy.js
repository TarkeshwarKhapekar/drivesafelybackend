"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _policy = require("../../../controllers/policy");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-policy.js
 * @description: It Contain  policy  router/api.
 * @author: Siddhant Singh 
 */

const app = (0, _express.default)();
app.use(_express.default.json());
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/policy/add-policy:
 *  post:
 *   tags: ["Policy"]
 *   summary: add policy api
 *   description: API used to Add Policy
 *   parameters:
 *      - in: body
 *        name: corporate
 *        description: The corporate to create.
 *        schema:
 *         type: object
 *         required:
 *          - add corporate
 *         properties:
 *           title:
 *             type: string
 *             required: false 
 *           titleJa:
 *             type: string
 *             required: false
 *           description:
 *             type: string
 *             required: false 
 *           descriptionJa:
 *             type: string
 *             required: false 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/policy/add-policy", _policy.addPolicy);
var _default = app;
exports.default = _default;