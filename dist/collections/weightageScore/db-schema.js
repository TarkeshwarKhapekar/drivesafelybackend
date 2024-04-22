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
 * @description: It Contain db schema for weightageScore collection.
 * @author: Siddhant Singh
 */

const Schema = _mongoose.default.Schema;
const weightageScoreSchema = new _mongoose.default.Schema({
  sleepScore: {
    type: Number,
    required: false,
    default: 0
  },
  exerciseScore: {
    type: Number,
    required: false,
    default: 0
  },
  stressScore: {
    type: Number,
    required: false,
    default: 0
  },
  reflexScore: {
    type: Number,
    required: false,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
var _default = weightageScoreSchema;
exports.default = _default;