"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: db-schema.js
 * @description: It Contain db schema for reflex collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const reflexSchema = new _mongoose.default.Schema({
  reflexscreen1: {
    type: String,
    required: false
  },
  reflexscreen2: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
reflexSchema.index({
  createdAt: 1
});
var _default = reflexSchema;
exports.default = _default;