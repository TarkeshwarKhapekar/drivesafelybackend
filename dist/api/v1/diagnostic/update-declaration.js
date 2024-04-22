"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _diagnostic = require("../../../controllers/diagnostic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-declaration.js
 * @description: It Contain update declaration  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/declaration/update-declaration:
 *  post:
 *   tags: ["Declaration"]
 *   summary: declaration update api
 *   description: API used to Update Declaration
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The declaration to update.
 *        schema:
 *         type: object
 *         required:
 *          - declaration update
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           bedTime:
 *             type: string
 *             required: true
 *           wake_upTime:
 *             type: string
 *             required: true
 *           meal:
 *             type: string
 *             required: false
 *             enum: ["Breakfast", "Lunch", "Dinner", "Other"]
 *           physical_condition:
 *             type: string
 *             required: true
 *             enum: ["Good", "Bad"]
 *           fatigue_existence:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           do_meditation:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           memo:
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const notificationSchema = _joi.default.object({});
app.post("/declaration/update-declaration",
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_diagnostic.updateDeclaration);
var _default = app;
exports.default = _default;