"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Pankaj Chaudhari
 */

const {
  swaggerURL,
  swaggerPort
} = _config.default.get('app');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Driving Safety project apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "Pankaj Chaudhari"
      },
      servers: [`${swaggerURL}`]
    },
    produces: ["application/json"],
    host: `${swaggerPort}`
  },
  apis: ["./api/v1/user/*.js", "./api/v1/notification/*.js", "./api/v1/pdeclaration/*.js", "./api/v1/diagnostic/*.js", "./api/v1/content_management/*.js", "./api/v1/questionnaire/*.js", "./api/v1/corporate_master/*.js", "./api/v1/qol/*.js", "./api/v1/weightageScore/*.js", "./api/v1/judgement/*.js", "./api/v1/policy/*.js", "./api/v1/SOXAI/*.js", "./api/v1/qol/*.js", "./api/v1/reflex/*.js"],
  layout: "AugmentingLayout"
};
var _default = (0, _swaggerJsdoc.default)(swaggerOptions);
exports.default = _default;