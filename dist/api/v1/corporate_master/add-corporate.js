"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _corporate = require("../../../controllers/corporate");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-corporate.js
 * @description: It Contain add corporate  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/corporate/add-corporate:
 *  post:
 *   tags: ["Corporate-Master"]
 *   summary: add corporate api
 *   description: API used to Add Corporate
 *   parameters:
 *      - in: body
 *        name: corporate
 *        description: The corporate to create.
 *        schema:
 *         type: object
 *         required:
 *          - add corporate
 *         properties:
 *           name:
 *             type: string
 *             required: true 
 *           code:
 *             type: string
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const corporateSchema = _joi.default.object({});
app.post("/corporate/add-corporate",
// validator.body(declarationSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_corporate.addCorporate);
var _default = app;
exports.default = _default;