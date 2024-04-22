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
 * @description: It Contain db schema for pdeclaration collection.
 * @author: Manas Agrawal
 */

const Schema = _mongoose.default.Schema;
const reflectionSchema = new _mongoose.default.Schema({
  declarationId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Declaration",
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  reflexScore: {
    type: Number,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
reflectionSchema.index({
  createdAt: -1
});
reflectionSchema.index({
  declarationId: 1
});
var _default = reflectionSchema;
exports.default = _default;