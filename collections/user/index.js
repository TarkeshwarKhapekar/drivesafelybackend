/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Manpreet Singh
 */

import mongoose from "mongoose";
import userSchema from "./db-schema";

class UserClass {
  static checkEmail(email) {
    var obj = { email }
    return this.findOne(obj);
  }
  static checkPhone(phoneNumber) {
    var obj = { phone }
    return this.findOne(obj);
  }
  static checkToken(token) {
    return this.findOne({ "loginToken.token": token });
  }
  static saveUser(payload) {
    console.log("payload: " + JSON.stringify(payload));
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

  static onLoginDone(userId, loginToken, language, deviceToken = null, deviceType, otp = null) {

    console.log("language ",)
    let updateData = {
      $push: { loginToken: { token: loginToken, deviceToken: deviceToken, deviceType: deviceType } },
      $set: {
        language:language,
        lastLogin: Date.now(),
        updatedAt: Date.now(),
        otp: otp
      }
    };
if (language == ""){
  delete updateData.$set.language;
}

    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static updateUserInfo(userId, payload) {
    const updateData = {
      $set: {
        ...payload,
        updatedAt: Date.now()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static async addRating(payload) {
    console.log("Service addRating", payload);
    let updateData = {
      $push: { ratingBy: payload }
    };
    await this.findByIdAndUpdate({ _id: payload.drId }, updateData, { new: true });
    const queryObj = await this.findOne({ _id: mongoose.Types.ObjectId(payload.drId) }, { ratingBy: 1 });
    const queryObj1 = await this.findOne({ _id: mongoose.Types.ObjectId(payload.userId) }, { pointEarned: 1 });
    let updateData2 = { pointEarned: queryObj1.pointEarned + 10 };
    await this.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(payload.userId) }, updateData2, { new: true });
    const total = await queryObj.ratingBy.reduce((acc, c) => acc + c.rating, 0);
    const rating = await total / queryObj.ratingBy.length
    let updateData1 = { ratingAvg: rating };
    return await this.findByIdAndUpdate({ _id: payload.drId }, updateData1, { new: true });
  }


  static markAsFavourite(payload) {
    let updateData = {
      $push: { favouriteBy: payload.drId }
    };
    return this.findByIdAndUpdate(payload.id, updateData, { new: true });
  }

  static removeFavourite(payload) {
    let updateData = {
      $pull: { favouriteBy: payload.drId }
    };
    return this.findByIdAndUpdate(payload.id, updateData, { new: true });
  }

  static logout(userId, token) {
    let updateData = {
      $set: {
        updatedAt: Date.now()
      },
      $pull: { loginToken: { token } }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }

  static addVideo(payload, userId) {
    let updateData = { $push: { videos: { title: payload.title, url: payload.url } } };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static removeVideo(payload) {
    let updateData = { $pull: { videos: { _id: mongoose.Types.ObjectId(payload.id) } } };
    console.log("id", mongoose.Types.ObjectId(payload.id))
    console.log("userId", mongoose.Types.ObjectId(payload.userId))
    console.log("updateData", updateData)
    return this.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(payload.userId) }, updateData, { new: true });

  }

  static getExpireDate(month) {
    var dt = new Date();
    return new Date(dt.setMonth(dt.getMonth() + month));
  }

  // static updateVideo(userId,_id) {
  //   const query={_id:payload.userId, "videos._id":payload.id}
  //   let updateData = {$pull: { videos: { _id } }};
  //   return this.findByIdAndUpdate(userId, updateData);
  // }
}



userSchema.loadClass(UserClass);

export default mongoose.model("User", userSchema);
