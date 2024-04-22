"use strict";

var _multer = require("../../../utilities/multer");
var _multer2 = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-qol.js
 * @description: It Contain add qol router/api.
 * @author: Siddhant Singh 
 */
const express = require("express");
const {
  createValidator,
  Joi
} = require("express-joi-validation");
const {
  addQol
} = require("../../../controllers/qol");
const Thumbnails = require("../../../utilities/thumbnail");
const upload = (0, _multer2.default)({
  storage: _multer.storage
});
const app = express();
app.use(express.json());
const validator = createValidator({
  passError: true
});

/**
 * @swagger
 * /api/v1/qol/add-config:
 *   post:
 *     tags: ["Qol Management"]
 *     summary: add qol API
 *     description: API used to add qol
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
 *        description: The type of qol.
 *        type: string
 *        required: false 
 *      - in: formData
 *        name: description
 *        description: The type of qol.
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
 *      - in: formData
 *        name: led
 *        description: The let of qol.
 *        type: file
 *        required: false
 *      - in: formData
 *        name: vibrations
 *        description: The vibrations of qol.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/qol/add-config", [upload.fields([{
  name: 'images',
  maxCount: 10
}, {
  name: 'videos',
  maxCount: 10
}])],
//   validator.body(Joi.object({
//     min_Value: Joi.string().required()
//   })),
Thumbnails.createThumbnails, addQol);
module.exports = app;