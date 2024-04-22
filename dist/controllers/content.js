"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateContent = exports.getContentByType = exports.getContent = exports.getAllContentTopcontents = exports.getAllContent = exports.deleteContentVideo = exports.deleteContentImage = exports.deleteContent = exports.addContent = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/content"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: content.js
 * @description: It Contain function layer for content controller.
 * @author: Manas Agrawal
 */

/**************** Add Content ***********/
const addContent = async (req, res, next) => {
  var _req$files, _req$files2;
  let payload = req === null || req === void 0 ? void 0 : req.body;
  console.log("payload", JSON.stringify(payload));

  // Check if the image file was uploaded
  let image = [];
  if (req !== null && req !== void 0 && (_req$files = req.files) !== null && _req$files !== void 0 && _req$files.images) {
    // Check if there is only one file or multiple files
    console.log("req", req.files.images);
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
  // videos: [{
  //     videoURL: {
  //       type: String,
  //       required: false,
  //     },
  //     thumbnailURL: {
  //       type: Array,
  //       required: false,
  //       default: []
  //     }
  //   }],
  if (req !== null && req !== void 0 && (_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.videos) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.videos)) {
      // video = req.files.videos.map((file) =>  file.filename);

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
    title,
    titleJa,
    description,
    descriptionJa,
    ...rest
  } = payload;
  try {
    const result = await SERVICE.saveContent({
      title: {
        en: title,
        ja: titleJa
      },
      description: {
        en: description,
        ja: descriptionJa
      },
      images: image,
      videos: video,
      ...rest
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.contentAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Content by id ***********/
exports.addContent = addContent;
const getContent = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.getContent(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.getContent = getContent;
const getContentByType = async (req, res, next) => {
  const payload = req.params;
  console.log("inside ctr" + payload);
  try {
    const result = await SERVICE.getContentByType(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
/**************** Get all Content ***********/
exports.getContentByType = getContentByType;
const getAllContent = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllContent(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.getAllContent = getAllContent;
const getAllContentTopcontents = async (req, res, next) => {
  try {
    console.log("Controller for content");
    const data = await SERVICE.getAllContentTopcontents(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update Content ***********/
exports.getAllContentTopcontents = getAllContentTopcontents;
const updateContent = async (req, res, next) => {
  var _req$files3, _req$files4;
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload, "payload");
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
  let video = [];
  // videos: [{
  //     videoURL: {
  //       type: String,
  //       required: false,
  //     },
  //     thumbnailURL: {
  //       type: Array,
  //       required: false,
  //       default: []
  //     }
  //   }],
  if (req !== null && req !== void 0 && (_req$files4 = req.files) !== null && _req$files4 !== void 0 && _req$files4.videos) {
    // Check if there is only one file or multiple files
    if (Array.isArray(req.files.videos)) {
      // video = req.files.videos.map((file) =>  file.filename);

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
  // let videos = [];
  // if (req?.files?.videos) {
  //     // Check if there is only one file or multiple files
  //     if (Array.isArray(req.files.videos)) {
  //         videos = req.files.videos.map((file) => file.filename);
  //     } else {
  //         videos.push(req.files.videos[0].filename);
  //     }
  // }
  try {
    // const existingData = await SERVICE.getContent(payload); // Get existing data from database

    // Convert existing images and videos to arrays if they are not already arrays
    //    const existingImages = Array.isArray(existingData.images) ? existingData[0].images : existingData[0].images;
    // const existingVideos = Array.isArray(existingData.videos) ? existingData[0].videos : existingData[0].videos;

    // Combine the existing and new data
    // const updatedImages = [...existingImages, ...images];
    // const updatedVideos = [...existingVideos, ...videos];

    const {
      title,
      titleJa,
      description,
      descriptionJa,
      ...rest
    } = payload;
    let postDT = {
      ...rest,
      title: {
        en: title,
        ja: titleJa
      },
      description: {
        en: description,
        ja: descriptionJa
      }
      // images: images, //updatedImages,
      // videos: video //updatedVideos
    };
    //   $push: { videos: { $each: video } }

    if (video.length > 0 && images.length > 0) {
      console.log("both are present");
      postDT["$push"] = {
        videos: {
          $each: video
        },
        images: {
          $each: images
        }
      };
    } else {
      console.log("vidoe =", video.length);
      if (video.length > 0) {
        postDT["$push"] = {
          videos: {
            $each: video
          }
        };
      }
      console.log("image =", images.length);
      if (images.length > 0) {
        postDT["$push"] = {
          images: {
            $each: images
          }
        };
      }
    }
    const data = await SERVICE.updateContent(postDT);
    console.log(data);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.contentUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Content ***********/
exports.updateContent = updateContent;
const deleteContent = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteContent(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.contentRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Content Image ***********/
exports.deleteContent = deleteContent;
const deleteContentImage = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload, "payload");
  try {
    const data = await SERVICE.deleteContentImage(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.contentRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Content Video ***********/
exports.deleteContentImage = deleteContentImage;
const deleteContentVideo = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload, "payload");
  try {
    const data = await SERVICE.deleteContentVideo(payload);
    console.log(data, "data controlserer");
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.contentRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.deleteContentVideo = deleteContentVideo;