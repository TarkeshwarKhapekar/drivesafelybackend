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
 * @description: It Contain db schema for questionnaireFeedback collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const questionnaireFSchema = new _mongoose.default.Schema({
  declarationId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Declaration",
    required: true
  },
  count: {
    type: Number,
    required: false,
    default: 0
  },
  totalScore: {
    type: Number,
    required: false,
    default: 0
  },
  response: [{
    questionName: {
      type: String,
      required: false,
      default: ""
    },
    ansType: {
      type: String,
      required: false,
      default: ""
    },
    options: [{
      name: {
        type: String,
        required: false,
        default: ""
      },
      scoreVal: {
        type: Number,
        required: false,
        default: ""
      },
      selected: {
        type: Boolean,
        required: false,
        default: false
      }
    }]
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
var _default = questionnaireFSchema;
exports.default = _default;