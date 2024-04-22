"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _reflex = require("../../../controllers/reflex");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-reflex.js
 * @description: It Contain register reflex router/api.
 * @author: Siddhant Singh
 */

const app = (0, _express.default)();

/**
 * @swagger
 * /api/v1/reflex/get-reflex:
 *  get:
 *   tags: ["Reflex Management"]
 *   summary: get-reflex list api
 *   description: API used to Get Reflex
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/reflex/get-reflex", _reflex.getReflexScreen);
var _default = app;
exports.default = _default;