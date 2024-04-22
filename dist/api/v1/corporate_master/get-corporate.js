"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _corporate = require("../../../controllers/corporate");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-corporate.js
 * @description: It Contain get corporate by id router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/corporate/get-corporate/{id}:
 *  get:
 *   tags: ["Corporate-Master"]
 *   summary: get-corporate list api
 *   description: API used to Get Corporate
 *   parameters:
 *     - in: path
 *       name: id
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/corporate/get-corporate/:id",
// checkToken,
_corporate.getCorporate);
var _default = app;
exports.default = _default;