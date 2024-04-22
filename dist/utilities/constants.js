"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLE = exports.NOTIFICATION_MESSAGE = exports.NOTIFICATION_CATEGORY = exports.LIMIT = exports.DEVICE = exports.APPOINTMENTSTATUS = void 0;
/*
 * @file: constants.js
 * @description: It Contain all constants for application.
 * @author: Pankaj Chaudhari
 */

/****************** Constants ******************/

const ROLE = {
  ADMIN: 1,
  GUEST: 2,
  FUND_RAISER: 3,
  VOLUNTEER: 4,
  DONER: 5
};
exports.ROLE = ROLE;
const APPOINTMENTSTATUS = {
  PENDING: 0,
  REJECTED: 2,
  APPROVED: 1,
  CANCELED: 3,
  COMPLETED: 4
};
exports.APPOINTMENTSTATUS = APPOINTMENTSTATUS;
const LIMIT = {
  USERS: 10,
  PROJECTS: 10
};
exports.LIMIT = LIMIT;
const DEVICE = {
  IOS: "ios",
  ANDROID: "android",
  WEB: "web"
};
exports.DEVICE = DEVICE;
const NOTIFICATION_CATEGORY = {
  APPOINTMENT: "booking"
};
exports.NOTIFICATION_CATEGORY = NOTIFICATION_CATEGORY;
const NOTIFICATION_MESSAGE = {
  NEWAPPOINTMENT: "New Appointment",
  APPROVEDAPPOINTMENT: "Appointment Approved",
  REJECTAPPOINTMENT: "Appointment Rejected",
  CANCELAPPOINTMENT: "Appointment Cancelled",
  COMPLETEDAPPOINTMENT: "Appointment Completed"
};
exports.NOTIFICATION_MESSAGE = NOTIFICATION_MESSAGE;