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
 * @description: It Contain function layer for pdeclaration collection.
 * @author: Pankaj Chaudhari
 */

class Delcaration {
  static saveDelcaration(payload) {
    return this(payload).save();
  }
  static findByCondition(condition) {
    return this.find(condition);
  }
}
_dbSchema.default.loadClass(Delcaration);
var _default = _mongoose.default.model("Delcaration", _dbSchema.default);
exports.default = _default;