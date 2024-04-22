"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _corporate = require("../../../controllers/corporate");
var _universal = require("../../../utilities/universal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: get-all-corporate.js
 * @description: It Contain get all corporate list router/api.
 * @author: Manas Agrawal
 */

const app = (0, _express.default)();
/**
 * @swagger
 * /api/v1/corporate/get-all-corporate:
 *  get:
 *   tags: ["Corporate-Master"]
 *   summary: get-all-corporate list api
 *   description: API used to Get Corporate List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/corporate/get-all-corporate",
//   checkToken,
_corporate.getAllCorporate);
var _default = app;
exports.default = _default;