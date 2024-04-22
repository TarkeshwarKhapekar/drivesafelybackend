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
 * @description: It Contain db schema for notification collection.
 * @author: Manas Agrawal
 */

const Schema = _mongoose.default.Schema;
const notificationSchema = new _mongoose.default.Schema({
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
  message: {
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
  image: {
    type: Array,
    required: false,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
notificationSchema.index({
  createdAt: -1
});
var _default = notificationSchema;
exports.default = _default;