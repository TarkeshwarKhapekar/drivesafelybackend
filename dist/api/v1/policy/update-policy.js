"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _policy = require("../../../controllers/policy");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-corporate.js
 * @description: It Contain update corporate  router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/policy/update-policy:
 *  post:
 *   tags: ["Policy"]
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

app.post("/policy/update-policy", _policy.updatePolicy);
var _default = app;
exports.default = _default;