"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _expressJoiValidation = require("express-joi-validation");
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _content = require("../../../controllers/content");
var _multer2 = require("../../../utilities/multer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: update-content.js
 * @description: It Contain content  router/api.
 * @author: Manas Agrawal
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
 * /api/v1/content/update-content:
 *  post:
 *   tags: ["Content Management"]
 *   summary: content update api
 *   description: API used to Update Content
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: id
 *        description: The type of content.
 *        type: string
 *        required:
 *      - in: formData
 *        name: type
 *        description: The type of content.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        description: The title of content.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: url
 *        description: The url of content.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: frequency
 *        description: The frequency of content.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: description
 *        description: The description of content.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: images
 *        description: The images of content.
 *        type: file
 *        required: false
 *      - in: formData
 *        name: videos
 *        description: The videos of content.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const contentSchema = _joi.default.object({
  title: _joi.default.string().required().label("title")
});
app.post("/content/update-content", [upload.fields([{
  name: 'images',
  maxCount: 10
}, {
  name: 'videos',
  maxCount: 10
}])], Thumbnails.createThumbnails,
// validator.body(userSchema, {
//   joi: { convert: true, allowUnknown: false }
// }),
_content.updateContent);
var _default = app;
exports.default = _default;