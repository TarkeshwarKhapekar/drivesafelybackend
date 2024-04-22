"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _gm = _interopRequireDefault(require("gm"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: multer.js
 * @description: It Contain image upload middleware.
 * @author: Manas Agrawal
 */

/****************** Image Upload Middleware ******************/

const sharp = require('sharp');
const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    console.log("Storage");
    let dirpath = "Other";
    let notifyDirpath = "notifyImage";
    let videodir = "Other";
    if (req.body.type) {
      if (req.body.type == 'Advertisement') {
        dirpath = 'Advertisement';
        videodir = 'Advertisement';
      }
      if (req.body.type == 'Traffic Safety Information') {
        dirpath = 'Traffic Safety Information';
        videodir = 'Traffic Safety Information';
        // dirpath = 'TrafficSafetyInformation';
        // videodir = 'TrafficSafetyInformation';
      }

      if (req.body.type == 'Articles & Blogs') {
        dirpath = 'Articles & Blogs';
        videodir = 'Articles & Blogs';
        // dirpath = 'Blogs';
        // videodir = 'Blogs';
      }

      if (req.body.type == 'Weather') {
        dirpath = 'Weather';
        videodir = 'Weather';
        // dirpath = 'Blogs';
        // videodir = 'Blogs';
      }

      if (req.body.type == 'Road Construction') {
        dirpath = 'Road Construction';
        videodir = 'Road Construction';
        // dirpath = 'Blogs';
        // videodir = 'Blogs';
      }

      if (req.body.type == 'Other') {
        dirpath = 'Other';
        videodir = 'Other';
        // dirpath = 'Blogs';
        // videodir = 'Blogs';
      }
    }

    if (file.fieldname == "images") {
      const fileDir = _path.default.resolve('public/images/' + dirpath);
      _fsExtra.default.ensureDirSync(fileDir); /***** Make sure that the upload path exits *****/
      cb(null, fileDir);
    }
    if (file.fieldname == "image") {
      const fileDir = _path.default.resolve('public/images/' + dirpath);
      _fsExtra.default.ensureDirSync(fileDir); /***** Make sure that the upload path exits *****/
      cb(null, fileDir);
    }
    if (file.fieldname == "videos") {
      const fileDir = _path.default.resolve('public/videos/' + videodir);
      _fsExtra.default.ensureDirSync(fileDir); /***** Make sure that the upload path exits *****/
      cb(null, fileDir);
    }
    if (file.fieldname == "reflexscreen1") {
      console.log("ref1");
      const fileDir = _path.default.resolve('public/images/' + dirpath);
      _fsExtra.default.ensureDirSync(fileDir); /***** Make sure that the upload path exits *****/
      cb(null, fileDir);
    }
    if (file.fieldname == "reflexscreen2") {
      console.log("ref2");
      const fileDir = _path.default.resolve('public/images/' + dirpath);
      _fsExtra.default.ensureDirSync(fileDir); /***** Make sure that the upload path exits *****/
      cb(null, fileDir);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + _path.default.extname(file.originalname));
    // console.log("file: " + file);
    // const cropWidth = 200; // Desired cropped image width
    // const cropHeight = 200; // Desired cropped image height

    // if (file.fieldname === 'images' || file.fieldname === 'image') {
    //   console.log("file", JSON.stringify(file))
    //   console.log("file.path", file.path)
    //   const imagePath = file.path;

    //   gm(imagePath)
    //     .size(function (err, size) {
    //       if (err) {
    //         console.error('Error reading image size:', err);
    //         return cb(err);
    //       }

    //       // Get the current image dimensions
    //       const { width, height } = size;

    //       // Calculate the crop coordinates
    //       const cropX = width > cropWidth ? Math.floor((width - cropWidth) / 2) : 0;
    //       const cropY = height > cropHeight ? Math.floor((height - cropHeight) / 2) : 0;

    //       // Resize and crop the image to the desired dimensions
    //       gm(imagePath)
    //         .resize(cropWidth, cropHeight, '^')
    //         .gravity('Center')
    //         .crop(cropWidth, cropHeight, cropX, cropY)
    //         .write(imagePath, function (err) {
    //           if (err) {
    //             console.error('Error saving cropped image:', err);
    //             return cb(err);
    //           }
    //           cb(null, file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname));
    //         });
    //     });
    // }
  }
});
exports.storage = storage;