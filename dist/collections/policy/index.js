"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dbSchema = _interopRequireDefault(require("./db-schema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It Contain function layer for policy collection.
 * @author: Siddhant Singh
 */

class QOL {
  static savePolicy(payload) {
    return this(payload).save();
  }
}
_dbSchema.default.loadClass(QOL);
var _default = _mongoose.default.model("policy", _dbSchema.default);
exports.default = _default;