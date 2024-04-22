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
 * @description: It Contain db schema for user collection.
 * @author: Pankaj Chaudhari
 */

const Schema = _mongoose.default.Schema;
const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: false,
    default: "",
    trim: true
  },
  email: {
    type: String,
    // unique: true,
    required: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: _validator.default.isEmail,
      message: `Not a valid email`
    }
  },
  phone: {
    type: String,
    required: false,
    default: "",
    trim: true
  },
  corporateCode: {
    type: String,
    default: "",
    required: false,
    trim: true
  },
  corporateId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Corporate",
    required: false
  },
  yearOfBirth: {
    // Year of Birth
    type: Number,
    default: "",
    required: false,
    trim: true
  },
  height: {
    type: Number,
    default: "",
    required: false,
    trim: true
  },
  weight: {
    type: Number,
    default: "",
    required: false,
    trim: true
  },
  restingHeartRate: {
    type: Number,
    default: "",
    required: false,
    trim: true
  },
  ringUse: {
    type: Boolean,
    default: false,
    required: false,
    trim: true
  },
  ringId: {
    type: String,
    default: "",
    required: false,
    trim: true
  },
  gender: {
    type: String,
    required: false,
    trim: true
  },
  password: {
    type: String,
    default: ""
  },
  ringpassword: {
    type: String,
    default: ""
  },
  isVerified: {
    type: String,
    required: false,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  roles: {
    type: String,
    required: false,
    enum: ["ADMIN", "SUBADMIN", "DRIVER", "STAFF"],
    default: 'DRIVER'
  },
  status: {
    type: String,
    required: false,
    enum: ['active', 'deactive'],
    default: 'active'
  },
  otp: {
    type: Number
  },
  loginToken: [{
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    deviceToken: {
      type: String,
      default: "" // for testing
    },

    fcmToken: {
      type: String,
      default: "" // for testing
    },

    deviceType: {
      type: String,
      default: "web" // ios | android
    }
  }],

  isDeleted: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    required: false,
    enum: ["English", "Japanese"],
    default: "English"
  },
  ringToken: {
    token: {
      type: String,
      require: false,
      default: ""
    },
    lastLogin: {
      type: Date,
      default: new Date()
    }
  },
  // lastLogin: {
  //   type: Date,
  //   default: new Date()
  // },
  date_registered: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true
});

// Add an index on the createdAt field
userSchema.index({
  name: 1
});
userSchema.index({
  email: 1
});
userSchema.index({
  corporateCode: 1
});
userSchema.index({
  createdAt: -1
});
var _default = userSchema;
exports.default = _default;