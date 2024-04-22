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
 * @description: It Contain db schema for questionnaire collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const notificationSchema = new _mongoose.default.Schema({
  // questionName:{
  //     type: String,
  //     required: false,
  //     default: "",
  // }, 

  questionName: {
    en: {
      type: String,
      required: false,
      default: ""
    },
    ja: {
      type: String,
      required: false,
      default: ""
    }
  },
  ansType: {
    type: String,
    required: false,
    default: ""
  },
  options: [{
    name: {
      en: {
        type: String,
        required: false,
        default: ""
      },
      ja: {
        type: String,
        required: false,
        default: ""
      }
    },
    scoreVal: {
      type: Number,
      required: false,
      default: ""
    }
    // colorCode:{
    //     type: String,
    //     required: false,
    //     default: "",
    // },                  
  }],

  // questionnaireSetObj:{
  //     type:array,
  //     required: false,
  //     options: [
  //         {
  //             name:{
  //                 type: String,
  //                 required: false,
  //                 default: "",
  //             }, 
  //             scoreVal:{
  //                 type: Number,
  //                 required: false,
  //                 default: "",
  //             }, 
  //             colorCode:{
  //                 type: String,
  //                 required: false,
  //                 default: "",
  //             },                  
  //         }
  //     ]            
  // },

  isDeleted: {
    type: Boolean,
    default: false
  }
  // type: {
  //   type: String,
  //   default: ""
  // },
}, {
  timestamps: true
});
var _default = notificationSchema;
exports.default = _default;