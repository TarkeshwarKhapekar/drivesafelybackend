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
 * @description: It Contain db schema for content collection.
 * @author: Manas Agrawal
 */

const Schema = _mongoose.default.Schema;
const contentSchema = new _mongoose.default.Schema({
  type: {
    type: String,
    required: true
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
  url: {
    type: String,
    required: false
  },
  frequency: {
    type: String,
    required: true
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
  images: {
    type: Array,
    required: false,
    default: ""
  },
  videos: [{
    videoURL: {
      type: String,
      required: false
    },
    thumbnailURL: {
      type: String,
      required: false
    }
  }],
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
contentSchema.index({
  createdAt: -1
});
var _default = contentSchema;
exports.default = _default;