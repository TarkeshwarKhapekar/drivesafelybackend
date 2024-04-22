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
 * @file: update-corporate.js
 * @description: It Contain update corporate  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/corporate/update-corporate:
 *  post:
 *   tags: ["Corporate-Master"]
 *   summary: corporate update api
 *   description: API used to Update Corporate
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The corporate to update.
 *        schema:
 *         type: object
 *         required:
 *          - corporate update
 *         properties:
 *           _id:
 *             type: string
 *             required:
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

const corporateSchema = _joi.default.object({
  name: _joi.default.string().required().label("name"),
  code: _joi.default.string().required().label("code")
});
app.post("/corporate/update-corporate",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_corporate.updateCorporate);
var _default = app;
exports.default = _default;