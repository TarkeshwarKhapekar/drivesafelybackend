/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Pankaj Chaudhari
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/user";
import Message from "../utilities/messages";
import USERMODEL from "../collections/user";
import NOTIFICATIONMODEL from "../collections/notification";
import { ROLE } from "../utilities/constants";
import JUDGEMENTRESULT from "../collections/judgmentResult"

/**************** Add User ***********/
export const registerUser = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.save(payload);
    res.status(200).json(successAction(result, Message.userAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Add User ***********/
export const socialLogin = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.socialReg(payload);
    res.status(200).json(successAction(result, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Login user ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  console.log(payload)
  try {
    const data = await SERVICE.onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(200).json(failAction(error.message));
  }
};

/** Function to verify the OTP and update it **/
export const verifyOTP = async (req, res, next) => {
  try {
    const otp = req.body.otp;
    const payload = req.body;
    if (!otp) {
      return { status: 400, success: false, message: "OTP required" };
    }
    const data = await SERVICE.verifyOTP(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (err) {
    res.status(400).json(failAction(error.message));
  }
};

/** Forgot pasword **/
export const forgotPassword = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await SERVICE.paswordForgot(payload);
    res.json(successAction(data, Message.emailSend));
  } catch (error) {
    res.json(failAction(error.message));
  }
};

/* Update Password */
export const updatePassword = async (req, res, next) => {
  const payload = req.body
  try {
    const data = await SERVICE.updatePassword(payload);
    res.json(successAction(data, Message.passwordUpdated));
  } catch (err) {

  }
};

/**************** Logout user ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await SERVICE.logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Update User ***********/
export const updateProfile = async (req, res, next) => {
  try {
    const rest = await SERVICE.updateProfile(req);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Delete user ***********/
export const deleteUser = async (req, res, next) => {
  console.log("checkkkk", req.params);
  try {
    const data = await SERVICE.deleteUser(req.params);
    if (data) {
      res.json(successAction(data, Message.userRemoved));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};

/**************** Add User ***********/
export const imgBase64Upload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgBase64Upload(req);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Add User ***********/
export const imgUpload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgUpload(req);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const imgMultipleUpload = async (req, res, next) => {
  try {
    const rest = await SERVICE.imgMultipleUpload(req);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const getProfile = async (req, res, next) => {
  const payload = req.params;
  try {
    const rest = await SERVICE.getProfile(payload);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
}
/* Get all Promotion */
export const getAllUser = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllUser(req.query,req.user);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};
/* Update Promotion based on id */
export const updateStatus = async (req, res, next) => {
  try {
    const data = await SERVICE.updateStatus(req.body);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};

/*** change password **/
export const changePassword = async (req, res, next) => {
  let payload = req.body;
  try {
    const data = await SERVICE.changePassword(req.user.userId, payload);
    if (data.status == 200) {
      res.status(200).json(successAction(Message.passwordUpdated));
    } else {
      res.status(200).json(failAction(Message.invalidPassword));
    }

  } catch (error) {
    res.status(500).json(failAction(error.message));
  }
};

export const getDashboardData = async (req, res, next) => {
  try {
    const totalDrivers = await USERMODEL.find({ isDeleted: false, roles: "DRIVER" }).countDocuments();
    const totalNotifications = await NOTIFICATIONMODEL.find({ isDeleted: false }).countDocuments();
    const totalDiagnostics = await JUDGEMENTRESULT.find({ isDeleted: false }).countDocuments();


    const resultData = {
      Drivers: totalDrivers,
      Notifications: totalNotifications,
      Diagnostic: totalDiagnostics
    };
    res.status(200).json(successAction(resultData, Message.getDashboardData));
  } catch (err) {
    res.status(500).json(failAction(err.message));
  }
}
