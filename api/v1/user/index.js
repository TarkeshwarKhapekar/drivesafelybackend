/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: Pankaj Chaudhari
 */

import register from "./register";
import login from "./login";
import logout from "./logout";
import updateProfile from "./updateProfile"
import forgotPassword from "./forgot-password"
import updatePassword from "./update-password"
import verifyOTP from "./verify-otp"
import getProfile from "./get-profile"
import imgUpload from "./imgupload"
import getAllUser from "./get-all-user";
import updateStatus from "./updateStatus";
import deleteUser from "./delete-user";
import socialLogin from "./socia-login"
import changePassword from "./change-password";
import imgBase64Upload from "./imgBase64Upload";
import getDashboardData from "./statistics"

export default [
  register,
 
  login,
  logout,
  updateProfile,
  forgotPassword,
  getProfile,
  imgUpload,
  imgBase64Upload,
  getAllUser,
  updateStatus,
  changePassword,
  verifyOTP,
  updatePassword,
  deleteUser,
  getDashboardData
];
