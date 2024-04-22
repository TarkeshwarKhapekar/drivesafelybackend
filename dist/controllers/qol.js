"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQol = exports.getQolResult = exports.getQolList = exports.getQol = exports.getAllQol = exports.deleteQolVideo = exports.deleteQolImage = exports.deleteQol = exports.addQol = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/qol"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: qol.js
 * @description: It Contain function layer for qol controller.
 * @author: Siddhant Singh
 */

/**************** Add Qol ***********/
const addQol = async (req, res, next) => {
  var _req$files, _req$files2;
  console.log(req);
  let payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload);

  // Check if the image file was uploaded
  let image = [];
  if (req !== null && req !== void 0 && (_req$files = req.files) !== null && _req$files !== void 0 && _req$files.images) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.images)) {
      image = req.files.images.map(file => file.filename);
    } else {
      image.push(req.files.images[0].filename);
    }
  }

  // Check if the video file was uploaded
  console.log("vidoes", JSON.stringify(req.files.videos));
  console.log("thmbnails", JSON.stringify(req.thumbnails));
  let video = [];
  if (req !== null && req !== void 0 && (_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.videos) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.videos)) {
      // video = req.files.videos.map((file) => file.filename);

      req.files.videos.forEach(element => {
        video.push({
          videoURL: element.filename,
          thumbnailURL: element.thumbnail
        });
      });
    } else {
      video.push(req.files.videos[0].filename);
    }
  }
  const {
    led,
    vibrations,
    level,
    levelJa,
    description,
    descriptionJa,
    ...rest
  } = payload;
  try {
    const result = await SERVICE.saveQol({
      led: led,
      vibrations: vibrations,
      level: {
        en: level,
        ja: levelJa
      },
      description: {
        en: description,
        ja: descriptionJa
      },
      images: image,
      videos: video,
      ...rest
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.qolAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get All Qol  ***********/
exports.addQol = addQol;
const getAllQol = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllQol(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Get Qol by id ***********/
exports.getAllQol = getAllQol;
const getQol = async (req, res, next) => {
  const payload = req.params;
  console.log(payload, "payload");
  try {
    const result = await SERVICE.getQol(payload);
    console.log(result, "result");
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Qol by id ***********/
exports.getQol = getQol;
const getQolList = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload);
  try {
    const result = await SERVICE.getQolInRange(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Update Qol ***********/
exports.getQolList = getQolList;
const updateQol = async (req, res, next) => {
  var _req$files3, _req$files4;
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload);
  // Check if the image file was uploaded
  let images = [];
  if (req !== null && req !== void 0 && (_req$files3 = req.files) !== null && _req$files3 !== void 0 && _req$files3.images) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.images)) {
      images = req.files.images.map(file => file.filename);
    } else {
      images.push(req.files.images[0].filename);
    }
  }

  // Check if the video file was uploaded
  let videos = [];
  if (req !== null && req !== void 0 && (_req$files4 = req.files) !== null && _req$files4 !== void 0 && _req$files4.videos) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.videos)) {
      // videos = req.files.videos.map((file) => file.filename);

      req.files.videos.forEach(element => {
        videos.push({
          videoURL: element.filename,
          thumbnailURL: element.thumbnail
        });
      });
    } else {
      videos.push(req.files.videos[0].filename);
    }
  }
  try {
    const existingData = await SERVICE.getQol(payload); // Get existing data from database

    // Convert existing images and videos to arrays if they are not already arrays
    const existingImages = Array.isArray(existingData.images) ? existingData[0].images : existingData[0].images;
    const existingVideos = Array.isArray(existingData.videos) ? existingData[0].videos : existingData[0].videos;

    // Combine the existing and new data
    const updatedImages = [...existingImages, ...images];
    const updatedVideos = [...existingVideos, ...videos];
    const {
      level,
      levelJa,
      description,
      descriptionJa,
      ...rest
    } = payload;
    const data = await SERVICE.updateQol({
      ...rest,
      level: {
        en: level,
        ja: levelJa
      },
      description: {
        en: description,
        ja: descriptionJa
      },
      images: updatedImages,
      videos: updatedVideos
    });
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Content ***********/
exports.updateQol = updateQol;
const deleteQol = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteQol(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

// export const deleteQolImage = async (req, res, next) => {
//     try {
//         const qolId = req.params.qolId; // Assuming the QoL ID is passed as a URL parameter
//         const imageIndex = req.params.imageIndex; // Assuming the image index is passed as a URL parameter

//         // Call the service method to delete the image
//         const result = await SERVICE.deleteQolImage(qolId, imageIndex);

//         if (result) {
//             res.status(200).json(successAction(null, "Image deleted successfully."));
//         } else {
//             res.status(404).json(failAction("Image not found."));
//         }
//     } catch (error) {
//         res.status(400).json(failAction(error.message));
//     }
// };

// get qol result from config
exports.deleteQol = deleteQol;
const getQolResult = async (req, res, next) => {
  console.log("Inside QOL Result Controller", req.body);
  const payload = req.body;
  try {
    const result = await SERVICE.getQolResult(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.getQolResult = getQolResult;
const deleteQolImage = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload);
  try {
    const data = await SERVICE.deleteQolImage(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Qol Video ***********/
exports.deleteQolImage = deleteQolImage;
const deleteQolVideo = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload, "payload");
  try {
    const data = await SERVICE.deleteQolVideo(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.deleteQolVideo = deleteQolVideo;