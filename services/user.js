/*
 * @file: USERMODEL.js
 * @description: It Contain function layer for user service.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import USERMODEL from "../collections/user";
import Message from "../utilities/messages";
import {
  encryptpassword,
  generateToken,
  generateRandom,
  getTimeStamp
} from "../utilities/universal";
import * as COMMON from "./common";
import * as Mail from "../utilities/mail";
import config from "config";
import mailchimp from '@mailchimp/mailchimp_marketing';
const { mailchimp_key, mailchimp_audience_id } = config.get('app');

mailchimp.setConfig({
  apiKey: mailchimp_key,
  server: 'us2',
});

const { frontendUrl } = config.get("app");
const formidable = require("formidable");
const form = formidable({ multiples: true });

// This id should always be the current id of the quenstionaire answer Virtual/online
// TODO: Please change this id when reseeding database.
const VIRTUALSERVICE = "5eb1a4e199957471610e6cf2";

// import {
//   CreateUser,
//   createCharge,
//   couponCreate,
//   CreateToken, monthlyWithSubscription, deleteSubscription, InvoicSubscription, monthlyWitOutCouponSubscription,
//   createPricePlan,
//   getSubscriptionByID,
//   RetrieveUser,
//   CreateCheckoutSession,
//   CreatePortalSession,
//   constructStripeEvent
// } from "./stripe";

/********** Save users **********/
export const save = async payload => {
  payload.email = payload.email.toLowerCase();
  const userExists = await USERMODEL.checkEmail(payload.email);
  if (userExists) throw new Error(Message.emailAlreadyExists);
  const pwd = payload.password;
  payload["password"] = encryptpassword(payload.password);
  payload["ringpassword"] = pwd;
  const lng = payload.language?payload.language:"";

  let saveData = await USERMODEL.saveUser(payload);

  /*************** Create Stripe Customer ***************/
  if (saveData.roles === 'SP' || saveData.roles === 'C') {
    // console.log(saveData);
    // const customer = await CreateUser(saveData.email, saveData._id.toString());

    // await USERMODEL.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(saveData._id) }, {
    //   stripeCustId: customer.id
    // }, { new: true });
  }
  // await subscribe(payload);

  let loginToken = generateToken({
    when: getTimeStamp(),
    roles: payload.roles,
    userId: saveData._id,
    email: saveData.email,
    deviceType: payload.deviceType,
    deviceToken: payload.deviceToken,
    language:payload.language?payload.language:""
  });
  const data = await USERMODEL.onLoginDone(saveData._id, loginToken,lng);
  let message = "Welcome and thanks for joining us"



  // if (payload.roles == "U") {
  //   message = "Welcome and thanks for joining "
  // }

  /***************** verificatiopn email ****************/
  const result = await Mail.htmlFromatWithObject({
    message: message,
    email: saveData.email,
    name: "User",
    password: pwd,
    emailTemplate: "user-account",
  });

  const emailData = {
    to: saveData.email,
    subject: Mail.subjects.registerRequest,
    html: result.html,
    templateId: "user-account",
  };

  Mail.SENDEMAIL(emailData, function (err, res) {
    if (err)
      console.log(
        "-----@@----- Error at sending verify mail to user -----@@-----",
        err
      );
    else
      console.log(
        "-----@@----- Response at sending verify mail to user -----@@-----",
        res
      );
  });

  return {
    _id: saveData._id,
    email: saveData.email,
    loginToken: loginToken,
    // lastLogin: saveData.lastLogin,
    name: saveData.firstName,
    roles: saveData.roles,
    gender: saveData.gender,
    phone: saveData.phone,
    language:saveData.language?saveData.language:""
  };
};

export const socialReg = async (payload) => {
  payload.email = payload.email.toLowerCase();
  var userExists = await USERMODEL.checkEmail(payload.email);
  if (!userExists) {
    userExists = await USERMODEL.saveUser({ ...payload });
    await subscribe(payload);
  }
  let loginToken = generateToken({
    when: getTimeStamp(),
    roles: userExists.roles,
    userId: userExists._id,
    email: userExists.email,
  });
  const data = await USERMODEL.onLoginDone(userExists._id, loginToken);
  return {
    _id: data._id,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin,
    firstName: data.firstName,
    lastName: data.lastName,
    roles: data.roles,
    isVipAffiliateUser: data.isVipAffiliateUser
  };
};


/********** Login users **********/
export const onLogin = async (payload) => {
  console.log(payload,"payload")
  console.clear();
  const lng = payload.language?payload.language:"";
  console.log("lng ==",lng)
  payload["email"] = payload.email.toLowerCase();
  const userData = await USERMODEL.findOneByCondition({
    email: payload.email,
    password: encryptpassword(payload.password),
  });
  if (!userData) throw new Error(Message.invalidCredentials);
  if (userData.roles !== payload.loginType && userData.roles == "DRIVER") throw new Error(Message.invalidRole); // ADDING THIS TO VERIFY ROLE
  if (!userData.status) throw new Error(Message.accountDeactive);

  let loginToken = generateToken({
    when: new Date(),
    // lastLogin: userData.lastLogin,
    userId: userData._id,
    roles: userData.roles,
    deviceType: payload.deviceType,
    deviceToken: payload.deviceToken,
    corporateCode: userData.corporateCode,
    language:payload.language?payload.language:""
  });
  console.log(loginToken,"logintoken")
  const data = await USERMODEL.onLoginDone(userData._id, loginToken,lng);
  return {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    roles: userData.roles,
    loginToken: loginToken,
    corporateCode: userData.corporateCode,
    language:payload.language?payload.language:""
     // loginToken[loginToken.length - 1].token,
    // lastLogin: userData.lastLogin,
    // lastName: data.lastName,
    // favouriteBy: data.favouriteBy ? data.favouriteBy : "",
    // isVipAffiliateUser: data.isVipAffiliateUser
  };
};

/********** Save users **********/
export const updateProfile = async (payload) => {
  console.log("Updating profile for user",payload.body);
  let datas = JSON.parse(JSON.stringify(payload.body))
  
  delete datas["_id"]

  let data = {}
  const query = { _id: mongoose.Types.ObjectId(payload.body._id) }
  console.log("query",query)
  console.log("datas",datas)
  // console.log("ringUse", ringUse)

  // if (payload.body.name) {
  //   // data.name = payload.body.name
  //   Object.assign(data,{name:payload.body.name})
  // }
  // if (payload.body.email) {
  //   // data.email = payload.body.email
  //   Object.assign(data,{email:payload.body.email})
  // }
  // if (payload.body.phone) {
  //   // data.phone = payload.body.phone
  //   Object.assign(data,{phone:payload.body.phone})
  // }
  // if (payload.body.gender) {
  //   // data.gender = payload.body.gender
  //   Object.assign(data,{gender:payload.body.gender})
  // }
  // if (payload.body.password) {
  //   // data.password = payload.body.password
  //   // Object.assign(data,{password:payload.body.password})
  // }
  // if (payload.body.corporateCode) {
  //   // data.corporateCode = payload.body.corporateCode
  //   Object.assign(data,{corporateCode:payload.body.corporateCode})
  // }
  // if (payload.body.corporateId) {
  //   // data.corporateId = payload.body.corporateId
  //   // Object.assign(data,{corporateCode:payload.body.corporateCode})
  // }
  // if (payload.body.yearOfBirth) {
  //   // data.yearOfBirth = payload.body.yearOfBirth
  //   Object.assign(data,{yearOfBirth:payload.body.yearOfBirth})
  // }
  // if (payload.body.height) {
  //   // data.height = payload.body.height
  //   Object.assign(data,{height:payload.body.height})
  // }
  // if (payload.body.weight) {
  //   // data.weight = payload.body.weight
  //   Object.assign(data,{weight:payload.body.weight})
  // }
  // if (payload.body.restingHeartRate) {
  //   // data.restingHeartRate = payload.body.restingHeartRate
  //   Object.assign(data,{restingHeartRate:payload.body.restingHeartRate})
  // }
  // if (payload.body.ringUse) {
  
  //   // data.ringUse = payload.body.ringUse
    
  // }
  // if (payload.body.ringId) {
  //   // data.ringId = payload.body.ringId
  //   Object.assign(data,{ringId:payload.body.ringId})
  // }
  // if (payload.body.code) {
  //   // data.code = payload.body.code
  //   Object.assign(data,{code:payload.body.code})
  // }

  console.log("data",datas)
  let savedata = await USERMODEL.findOneAndUpdate(query, datas, { fields: { loginToken: 0, createdAt: 0, updatedAt: 0, password: 0 }, new: true });
  return savedata;

};

/********** Delete user **********/
export const deleteUser = async (payload) => {
  return await USERMODEL.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(payload.id) },
      { isDeleted: true },
      { fields: { _id: 1 }, new: true }
  );
};

export const imgBase64Upload = async (payload) => {
  let imgesdata = "";
  let imgLocation = "users";
  if (payload.body.imgLocation) {
    imgLocation = payload.body.imgLocation;
  }
  if (payload.body.image) {
    imgesdata = await COMMON.uploadImagebase64(payload.body.image, imgLocation);
  }
  const data = { profileImage: imgesdata }
  const query = { _id: mongoose.Types.ObjectId(payload.user.userId) }
  let savedata = await USERMODEL.findOneAndUpdate(query, data, { new: true });
  return savedata;
};

export const imgUpload = async (payload) => {
  let imgesdata = "";
  let imgLocation = "users";
  if (payload.imgLocation) {
    imgLocation = payload.imgLocation;
  }
  if (payload.files && payload.files.profileImage) {
    console.log("                                 ");
    console.log("Payload files ", payload.files);
    imgesdata = await COMMON.singleImageUpload(payload.files.profileImage, 'users');
  }
  const data = { profileImage: imgesdata }
  const query = { _id: mongoose.Types.ObjectId(payload.body._id) }
  let savedata = await USERMODEL.findOneAndUpdate(query, data, { new: true });
  return savedata;
};

export const imgMultipleUpload = async (payload) => {
  let imgesdata = "";
  let imgLocation = "products";
  if (payload.imgLocation) {
    imgLocation = payload.imgLocation;
  }
  if (payload.files && payload.files.images) {
    imgesdata = await COMMON.multipleImageUpload(payload, imgLocation);
  }
  return imgesdata;
};



// Forgot password function and send link to email for password generate
export const paswordForgot = async (payload) => {
  if (!payload.email) throw new Error(Message.validEmail);
  payload.email = payload.email.toLowerCase();
  const userData = await USERMODEL.checkEmail(payload.email);
  if (!userData) throw new Error(Message.emailNotExists);
  const otp = Math.floor(10000 + Math.random() * 90000);

  if (userData) {
    // Saving otp to db it will use for verification 
    let saveData = await USERMODEL.findOneAndUpdate({ _id: userData._id },
      { otp: otp }, { fields: { _id: 1, email: 1, otp: 1 } }
    );

    /***************** verificatiopn email ****************/
    const result = await Mail.htmlFromatWithObject({
      data: userData,
      otp: otp,
      emailTemplate: "forgot-password",
    });

    const emailData = {
      to: payload.email,
      subject: Mail.subjects.forgetPassword,
      html: result.html,
      templateId: "forgot-password",
    };

    Mail.SENDEMAIL(emailData, function (err, res) {
      if (err)
        console.log(
          "-----@@----- Error at sending verify mail to user -----@@-----",
          err
        );
      else
        console.log(
          "-----@@----- Response at sending verify mail to user -----@@-----",
          res
        );
    });

    return await saveData;
  }
};

// Function to update the OTP 
export const verifyOTP = async (payload, res) => {
  try {
    const data = await USERMODEL.findOne({ _id: payload._id, otp: payload.otp });
    if (!data) {
      return { status: 404, success: false, message: "OTP does not match" };
    } else {
      return { status: 200, success: true, message: "OTP verified successfully" };
    }
  } catch (err) {
    return { status: 500, success: false, message: "Error", error: err };
  }
};

export const updatePassword = async (payload) => {
  try {
    if (!payload.password) {
      return res.status(400).json({ success: false, message: "password is required", });
    }
    if (!payload.confirmPassword) {
      return res.status(400).json({ success: false, message: "Confirmpassword is required" });
    }
    if (payload.confirmPassword !== payload.password) {
      return res.status(400).json({ success: false, message: "password does not match confirmPassword" });
    }
    const user = await USERMODEL.findOne({ _id: payload._id });
    if (user) {
      const hashedPassword = await encryptpassword(payload.password);
      const data = await USERMODEL.findOneAndUpdate(
        { _id: payload._id },
        { $set: { password: hashedPassword } }
      );
      // /***************** verificatiopn email ****************/
      // const result = await Mail.htmlFromatWithObject({
      //   data: data,
      //   password: payload.password,
      //   emailTemplate: "reset-password",
      // });

      // const emailData = {
      //   to: data.email,
      //   subject: Mail.subjects.resetPassword,
      //   html: result.html,
      //   templateId: "reset-password",
      // };

      // Mail.SENDEMAIL(emailData, function (err, res) {
      //   if (err)
      //     console.log(
      //       "-----@@----- Error at sending verify mail to user -----@@-----",
      //       err
      //     );
      //   else
      //     console.log(
      //       "-----@@----- Response at sending verify mail to user -----@@-----",
      //       res
      //     );
      // });

      return data;
    } else {
      return res.status(400).json({ success: false, message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, success: false, message: "error", error: err });
  }
};

export const getProfile = async (payload) => {
  console.log("Getting profile",payload.id)
  let matchObj = { _id: mongoose.Types.ObjectId(payload.id) }
  const queryObj = USERMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
  return await queryObj
};
/********** Logout users **********/
export const logoutUser = async (payload) => {
  return await USERMODEL.logout(payload.userId, payload.token);
};

export const getAllUser = async (payload, user) => {

let corporateCode ;
console.log("user.corporateCode=====================",user.corporateCode)
if(user.roles == 'SUBADMIN'){
  // roles: payload.roles,
  //   userId: saveData._id,
  //get user by id 
  let userID=  user.userId;
  console.log(userID,"userID")
  let udetails;
  try {
    // udetails = await USERMODEL.findById(userID);
    // console.log(udetails, "user");
    corporateCode =  user.corporateCode; // udetails.corporateCode;

    console.log("corporateCode from token= ", corporateCode)

  } catch (error) {
    console.error(error);
  }
  // const udetails = 
 
}







  // console.log(payload.roles)
  let sort = { [payload.sortBy ? payload.sortBy : "createdAt"]: -1 };
  let limit = payload.count ? JSON.parse(payload.count) : 10;
  payload.page = payload.page ? payload.page : 1
  let skip = JSON.parse((payload.page - 1) * limit);

  let matchObj = {
    isDeleted: false,
    roles: payload.roles
  }

  if(user.roles=='SUBADMIN'){
    console.log("adding corporate code in query")

    matchObj = {
      ...matchObj,
      corporateCode: corporateCode,
    };
    console.log("adding corporate code in query",matchObj)
  }
  
  if (payload.role) {
    matchObj = {
      ...matchObj,
      roles: payload.role,
    };
  }

 
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{ name: { $regex: regex } },
      { email: { $regex: regex } },
      { corporateCode: { $regex: regex } }
    
    ]
    };
  }
  console.log("matchobj before query",matchObj)
  const queryObj = USERMODEL.find(matchObj, { _id: 1, name: 1, gender: 1, email: 1, roles: 1, phone: 1, date_registered: 1, status: 1, corporateCode:1, yearOfBirth:1, height:1,weight:1,restingHeartRate:1,ringUse:1, ringId:1});
  let count = await queryObj;
  let data = await queryObj
    .skip(skip)
    .limit(limit)
    .sort(sort);

  return {
    data: data,
    total: count.length
  };
};


export const changePassword = async (userId,payload,res) => {
  const currentpwd = await encryptpassword(payload.currentpwd);
  try {    
    if (!payload.currentpwd) {
      return { status: 400, success: false, message: "currentpwd is required" };
    }
    if (!payload.password) {
      return { status: 400, success: false, message: "password is required" };
    }
    if (!payload.confirmPassword) {
      return { status: 400, success: false, message: "Confirmpassword is required" };
    }
    if (payload.confirmPassword !== payload.password) {
      return { status: 400, success: false, message: "password does not match confirmPassword" };
    }
    const user = await USERMODEL.findOneByCondition({ _id: userId});

    if(user.password == encryptpassword(payload.currentpwd)){
       console.log("password matched")
    }else{
      throw new Error(Message.invalidCredentials);
    }

    if (user) {
      const hashedPassword = await encryptpassword(payload.password);
      const data = await USERMODEL.findOneAndUpdate(
        { _id: userId },
        { $set: { password: hashedPassword } }
      );
      // /***************** verificatiopn email ****************/
      // const result = await Mail.htmlFromatWithObject({
      //   data: data,
      //   password: payload.password,
      //   emailTemplate: "reset-password",
      // });

      // const emailData = {
      //   to: data.email,
      //   subject: Mail.subjects.resetPassword,
      //   html: result.html,
      //   templateId: "reset-password",
      // };

      // Mail.SENDEMAIL(emailData, function (err, res) {
      //   if (err)
      //     console.log(
      //       "-----@@----- Error at sending verify mail to user -----@@-----",
      //       err
      //     );
      //   else
      //     console.log(
      //       "-----@@----- Response at sending verify mail to user -----@@-----",
      //       res
      //     );
      // });

      return {
        status:200,
        data:data};
    } else {
      return res.status(400).json({ success: false, message: "user not found" });
    }

  } catch (error) {
    return { status: 500, success: false, message: "error", error: "Invalid Password" }
    
  }
};

/* Update PRODUCTMODEL based on id */
export const updateStatus = async (payload) => {
  return await USERMODEL.findOneAndUpdate({ _id: mongoose.Types.ObjectId(payload.id) }, payload, { new: true });
};