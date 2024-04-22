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
 * @description: It Contain db schema for policy collection.
 * @author: Siddhant Singh
 */

const Schema = _mongoose.default.Schema;
const policySchema = new _mongoose.default.Schema({
  title: {
    en: {
      type: String,
      required: false,
      default: null
    },
    ja: {
      type: String,
      required: false,
      default: null
    }
  },
  description: {
    en: {
      type: String,
      required: false,
      default: null
    },
    ja: {
      type: String,
      required: false,
      default: null
    }
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
policySchema.index({
  createdAt: -1
});
var _default = policySchema;
exports.default = _default;