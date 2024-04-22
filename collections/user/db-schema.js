/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
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
        validator: validator.isEmail,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Corporate",
      required: false,
    },

    yearOfBirth: {  // Year of Birth
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
      enum: ["ADMIN","SUBADMIN","DRIVER", "STAFF"],
      default: 'DRIVER'
    },
    status: {
      type: String,
      required: false,
      enum: ['active', 'deactive'],
      default: 'active'
    },
    otp: {
      type: Number,
    },
    loginToken: [
      {
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
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false
    },
    language:{
      type: String,
      required: false,
      enum:["English","Japanese"],
      default:"English"
    },
    ringToken:{
      token:{
        type: String,
        require:false,
        default:""
      },
      lastLogin: {
      type: Date,
      default: new Date()
      },
    },
    // lastLogin: {
    //   type: Date,
    //   default: new Date()
    // },
    date_registered: {
      type: Date,
      default: new Date()
    },
  },
  { timestamps: true }
);


// Add an index on the createdAt field
userSchema.index({ name: 1 });
userSchema.index({ email: 1 });
userSchema.index({ corporateCode: 1 });
userSchema.index({ createdAt: -1 });
export default userSchema;
