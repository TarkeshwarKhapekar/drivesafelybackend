"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _multer2 = require("../../../utilities/multer");
var _qol = require("../../../controllers/qol");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-qol.js
 * @description: It Contain qol  router/api.
 * @author: Siddhant Singh
 */

const Thumbnails = require("../../../utilities/thumbnail");
const upload = (0, _multer.default)({
  storage: _multer2.storage
});
const app = (0, _express.default)();
const validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});

/**
 * @swagger
 * /api/v1/qol/update-config:
 *  post:
 *   tags: ["Qol Management"]
 *   summary: qol update api
 *   description: API used to Update Qol
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: min_value
 *        description: The type of qol.
 *        type: number
 *        required: false
 *      - in: formData
 *        name: max_value
 *        description: The type of qol.
 *        type: number
 *        required: false
 *      - in: formData
 *        name: level
 *        description: The title of qol.
 *        type: string
 *        required: false
 *      - in: formData
 *        name: description
 *        description: The url of qol.
 *        type: string
 *        required: false
 *      - in: formData
 *        name: images
 *        description: The images of qol.
 *        type: file
 *        required: false
 *      - in: formData
 *        name: videos
 *        description: The videos of qol.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/qol/update-config", [upload.fields([{
  name: 'images',
  maxCount: 10
}, {
  name: 'videos',
  maxCount: 10
}])], Thumbnails.createThumbnails, _qol.updateQol);
var _default = app;
exports.default = _default;