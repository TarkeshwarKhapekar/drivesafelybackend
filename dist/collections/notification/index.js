"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dbSchema = _interopRequireDefault(require("./db-schema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It Contain function layer for notification collection.
 * @author: Manas Agrawal
 */

class UserClass {
  static checkEmail(email) {
    var obj = {
      email
    };
    return this.findOne(obj);
  }
  static checkPhone(phoneNumber) {
    var obj = {
      phone
    };
    return this.findOne(obj);
  }
  static checkToken(token) {
    return this.findOne({
      "loginToken.token": token
    });
  }
  static saveUser(payload) {
    return this(payload).save();
  }
  static login(email, password) {
    return this.findOne({
      email,
      password,
      isDeleted: false
    });
  }
  static conditionalLogin(payload) {
    return this.findOne(payload);
  }
  static findone(query) {
    return this.findOne(query);
  }
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }
  static findByCondition(condition) {
    return this.find(condition);
  }
  static onLoginDone(userId, loginToken, deviceToken = null, deviceType, otp = null) {
    let updateData = {
      $push: {
        loginToken: {
          token: loginToken,
          deviceToken: deviceToken,
          deviceType: deviceType
        }
      },
      $set: {
        lastLogin: Date.now(),
        updatedAt: Date.now(),
        otp: otp
      }
    };
    return this.findByIdAndUpdate(userId, updateData, {
      new: true
    });
  }
  static updateUserInfo(userId, payload) {
    const updateData = {
      $set: {
        ...payload,
        updatedAt: Date.now()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, {
      new: true
    });
  }
  static async addRating(payload) {
    console.log("Service addRating", payload);
    let updateData = {
      $push: {
        ratingBy: payload
      }
    };
    await this.findByIdAndUpdate({
      _id: payload.drId
    }, updateData, {
      new: true
    });
    const queryObj = await this.findOne({
      _id: _mongoose.default.Types.ObjectId(payload.drId)
    }, {
      ratingBy: 1
    });
    const queryObj1 = await this.findOne({
      _id: _mongoose.default.Types.ObjectId(payload.userId)
    }, {
      pointEarned: 1
    });
    let updateData2 = {
      pointEarned: queryObj1.pointEarned + 10
    };
    await this.findByIdAndUpdate({
      _id: _mongoose.default.Types.ObjectId(payload.userId)
    }, updateData2, {
      new: true
    });
    const total = await queryObj.ratingBy.reduce((acc, c) => acc + c.rating, 0);
    const rating = (await total) / queryObj.ratingBy.length;
    let updateData1 = {
      ratingAvg: rating
    };
    return await this.findByIdAndUpdate({
      _id: payload.drId
    }, updateData1, {
      new: true
    });
  }
  static logout(userId, token) {
    let updateData = {
      $set: {
        updatedAt: Date.now()
      },
      $pull: {
        loginToken: {
          token
        }
      }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }
  static getExpireDate(month) {
    var dt = new Date();
    return new Date(dt.setMonth(dt.getMonth() + month));
  }
}
_dbSchema.default.loadClass(UserClass);
var _default = _mongoose.default.model("Notification", _dbSchema.default);
exports.default = _default;