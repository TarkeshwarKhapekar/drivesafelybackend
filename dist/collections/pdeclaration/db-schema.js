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
const declarationSchema = new _mongoose.default.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true
  },
  bedTime: {
    type: String,
    required: true
  },
  wake_upTime: {
    type: String,
    required: true
  },
  sleepScore: {
    type: String,
    required: false
  },
  meal: {
    type: Array,
    required: true
  },
  physical_condition: {
    type: String,
    required: true,
    enum: ["Good", "Bad"]
  },
  fatigue_existence: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  do_meditation: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  memo: {
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
declarationSchema.index({
  createdAt: -1
});
var _default = declarationSchema;
exports.default = _default;