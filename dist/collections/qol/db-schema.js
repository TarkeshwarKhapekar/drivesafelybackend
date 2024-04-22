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
 * @description: It Contain db schema for qol collection.
 * @author: Siddhant Singh
 */

const Schema = _mongoose.default.Schema;
const qolSchema = new _mongoose.default.Schema({
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
  led: {
    type: Boolean,
    required: false,
    default: false
  },
  vibrations: {
    type: Boolean,
    required: false,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
qolSchema.index({
  min_value: 1
});
qolSchema.index({
  max_value: 1
});
var _default = qolSchema;
exports.default = _default;