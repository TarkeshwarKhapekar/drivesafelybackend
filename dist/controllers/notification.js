"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotification = exports.getNotification = exports.getAllNotification = exports.deleteNotification = exports.deleteImage = exports.addNotification = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/notification"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: notification.js
 * @description: It Contain function layer for notification controller.
 * @author: Manas Agrawal
 */

/**************** Add Notification ***********/
const addNotification = async (req, res, next) => {
  var _req$files;
  const payload = req.body;
  console.log(payload);

  // Check if the image file was uploaded
  let images = [];
  if (req !== null && req !== void 0 && (_req$files = req.files) !== null && _req$files !== void 0 && _req$files.image) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.image)) {
      images = req.files.image.map(file => file.filename);
    } else {
      images.push(req.files.image[0].filename);
    }
  }
  const {
    title,
    titleJa,
    message,
    messageJa,
    ...rest
  } = payload;
  try {
    const result = await SERVICE.saveNotification({
      title: {
        en: title,
        ja: titleJa
      },
      message: {
        en: message,
        ja: messageJa
      },
      image: images,
      ...rest
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.notificationAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get notification by id ***********/
exports.addNotification = addNotification;
const getNotification = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.getNotification(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get all notification ***********/
exports.getNotification = getNotification;
const getAllNotification = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllNotification(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete notification ***********/
exports.getAllNotification = getAllNotification;
const deleteNotification = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteNotification(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.notificationRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update notification ***********/
exports.deleteNotification = deleteNotification;
const updateNotification = async (req, res, next) => {
  var _req$files2;
  const payload = req === null || req === void 0 ? void 0 : req.body;

  // Check if the image file was uploaded
  let images = [];
  if (req !== null && req !== void 0 && (_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.image) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.image)) {
      images = req.files.image.map(file => file.filename);
    } else {
      images.push(req.files.image[0].filename);
    }
  }
  try {
    const existingData = await SERVICE.getNotification(payload); // Get existing data from database

    // Convert existing images to an array if it's not already an array
    const existingImage = Array.isArray(existingData.image) ? existingData[0].image : existingData[0].image;

    // Combine the existing and new images
    const updatedImage = [...existingImage, ...images];
    const {
      title,
      titleJa,
      message,
      messageJa,
      ...rest
    } = payload;
    const updatedData = await SERVICE.updateNotification({
      ...rest,
      title: {
        en: title,
        ja: titleJa
      },
      message: {
        en: message,
        ja: messageJa
      },
      image: updatedImage
    });
    if (updatedData) {
      res.json((0, _response.successAction)(updatedData, _messages.default.notificationUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.updateNotification = updateNotification;
const deleteImage = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload);
  try {
    const data = await SERVICE.deleteImage(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.notificationRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.deleteImage = deleteImage;