/*
 * @file: index.js
 * @description: It Contain function layer for questionnaire collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import questionnaireSchema from "./db-schema";

class Questionnairefeedback {
  // static checkEmail(email) {
  //   var obj = { email }
  //   return this.findOne(obj);
  // }
  // static checkPhone(phoneNumber) {
  //   var obj = { phone }
  //   return this.findOne(obj);
  // }
  // static checkToken(token) {
  //   return this.findOne({ "loginToken.token": token });
  // }
  static saveFeedback(payload) {
    console.log("payload saveFeeback");
    console.log(payload);
    return this(payload).save();
  }
  // static login(email, password) {
  //   return this.findOne({
  //     email,
  //     password,
  //     isDeleted: false
  //   });
  // }
  // static conditionalLogin(payload) {
  //   return this.findOne(payload);
  // }
  static findone(query) {
    return this.findOne(query);
  }
  // static findOneByCondition(condition) {
  //   return this.findOne(condition);
  // }

  static findByCondition(condition) {
    return this.find(condition);
  }

  // static onLoginDone(userId, loginToken, deviceToken = null, deviceType, otp = null) {
  //   let updateData = {
  //     $push: { loginToken: { token: loginToken, deviceToken: deviceToken, deviceType: deviceType } },
  //     $set: {
  //       lastLogin: Date.now(),
  //       updatedAt: Date.now(),
  //       otp: otp
  //     }
  //   };
  //   return this.findByIdAndUpdate(userId, updateData, { new: true });
  // }

  // static updateUserInfo(userId, payload) {
  //   const updateData = {
  //     $set: {
  //       ...payload,
  //       updatedAt: Date.now()
  //     }
  //   };
  //   return this.findByIdAndUpdate(userId, updateData, { new: true });
  // }

  // static async addRating(payload) {
  //   console.log("Service addRating", payload);
  //   let updateData = {
  //     $push: { ratingBy: payload }
  //   };
  //   await this.findByIdAndUpdate({ _id: payload.drId }, updateData, { new: true });
  //   const queryObj = await this.findOne({ _id: mongoose.Types.ObjectId(payload.drId) }, { ratingBy: 1 });
  //   const queryObj1 = await this.findOne({ _id: mongoose.Types.ObjectId(payload.userId) }, { pointEarned: 1 });
  //   let updateData2 = { pointEarned: queryObj1.pointEarned + 10 };
  //   await this.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(payload.userId) }, updateData2, { new: true });
  //   const total = await queryObj.ratingBy.reduce((acc, c) => acc + c.rating, 0);
  //   const rating = await total / queryObj.ratingBy.length
  //   let updateData1 = { ratingAvg: rating };
  //   return await this.findByIdAndUpdate({ _id: payload.drId }, updateData1, { new: true });
  // }

  // static logout(userId, token) {
  //   let updateData = {
  //     $set: {
  //       updatedAt: Date.now()
  //     },
  //     $pull: { loginToken: { token } }
  //   };
  //   return this.findByIdAndUpdate(userId, updateData);
  // }

  // static getExpireDate(month) {
  //   var dt = new Date();
  //   return new Date(dt.setMonth(dt.getMonth() + month));
  // }
}


questionnaireSchema.loadClass(Questionnairefeedback);

export default mongoose.model("Questionnairefeedback", questionnaireSchema);
