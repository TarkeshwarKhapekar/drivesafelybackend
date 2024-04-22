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
const observationSchema = new _mongoose.default.Schema({
  declarationId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Declaration",
    required: true
  },
  deviceType: {
    type: String,
    required: true
  },
  pulse: {
    type: Number,
    required: false,
    default: 0
  },
  pulseVariation: [{
    pulse: {
      type: Number,
      required: false,
      default: 0
    },
    dateTime: {
      type: String,
      required: false,
      default: ""
    }
  }],
  QOL: {
    type: String,
    required: false,
    default: ""
  },
  steps: {
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
  sleepScore: {
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

// Add an index on the createdAt field
observationSchema.index({
  createdAt: -1
});
observationSchema.index({
  declarationId: 1
});
var _default = observationSchema;
exports.default = _default;