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
 * @description: It Contain db schema for steps collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const stepsSchema = new _mongoose.default.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true
  },
  steps: {
    type: Number,
    required: true,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
stepsSchema.index({
  createdAt: 1
});
var _default = stepsSchema;
exports.default = _default;