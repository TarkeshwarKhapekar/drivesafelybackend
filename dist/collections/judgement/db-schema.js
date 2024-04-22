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
 * @description: It Contain db schema for judgement collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const judgementSchema = new _mongoose.default.Schema({
  min_value: {
    type: Number,
    required: false
  },
  max_value: {
    type: Number,
    required: false
  },
  level: {
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
  colorCode: {
    type: String
  },
  // images: {
  //     type: Array,
  //     required: false,
  //     default: ""
  // },
  // videos: {
  //     type: Array,
  //     required: false,
  //     default: ""
  // },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
judgementSchema.index({
  createdAt: -1
});
var _default = judgementSchema;
exports.default = _default;