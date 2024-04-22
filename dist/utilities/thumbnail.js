"use strict";

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sharp = require('sharp');
function createThumbnail(videoFile, thumbnailPath) {
  return new Promise((resolve, reject) => {
    (0, _fluentFfmpeg.default)(videoFile).on('end', () => {
      resolve();
    }).on('error', err => {
      reject(err);
    }).screenshot({
      timestamps: ['50%'],
      filename: thumbnailPath,
      folder: './thumbnails',
      size: '320x240'
    });
  });
}
async function createThumbnails(req, res, next) {
  var _req$files;
  const files = req === null || req === void 0 ? void 0 : (_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.videos;
  if (!files || files.length === 0) {
    // return res.status(400).json({ message: 'No files uploaded' });
    next();
    return;
  }
  const thumbnailPromises = files.map(file => {
    const thumbnailPath = Date.now() + "_" + `thumbnail_${file.originalname.split('.').slice(0, -1).join('.')}.jpg`;
    return createThumbnail(file.path, thumbnailPath).then(() => {
      file.thumbnail = thumbnailPath; // Add the thumbnail path to the file object
      return thumbnailPath;
    }).catch(err => {
      console.error(`Error creating thumbnail for ${file.originalname}: ${err}`);
      return null;
    });
  });
  try {
    const thumbnails = await Promise.all(thumbnailPromises);
    req.files.videos = files; // Update the videos array in the request object
    req.files.videos.thumbnail = thumbnails.filter(thumbnail => thumbnail !== null); // Add the thumbnails array to the videos object
    next();
  } catch (err) {
    console.error('Error creating thumbnails:', err);
    return res.status(500).json({
      message: 'Error creating thumbnails'
    });
  }
}
module.exports = {
  createThumbnails
};