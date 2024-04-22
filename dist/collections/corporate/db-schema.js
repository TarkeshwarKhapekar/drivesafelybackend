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
 * @description: It Contain db schema for corporate collection.
 * @author: Manas Agrawal
 */

const Schema = _mongoose.default.Schema;
const corporateSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: false,
    default: ""
  },
  code: {
    type: String,
    required: false,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
corporateSchema.index({
  createdAt: -1
});
var _default = corporateSchema;
exports.default = _default;