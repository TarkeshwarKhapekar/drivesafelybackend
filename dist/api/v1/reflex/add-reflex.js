"use strict";

var _reflex = require("../../../controllers/reflex");
var _multer = require("../../../utilities/multer");
var _multer2 = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: add-reflex.js
 * @description: It Contain add reflex router/api.
 * @author: Siddhant Singh 
 */
const express = require("express");
const {
  createValidator,
  Joi
} = require("express-joi-validation");
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
 * /api/v1/reflex/add-reflex:
 *   post:
 *     tags: ["Reflex Management"]
 *     summary: add reflex API
 *     description: API used to add reflex
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: reflexscreen1
 *        description: The reflexscreen1 of reflex.
 *        type: file
 *        required: false
 *      - in: formData
 *        name: reflexscreen2
 *        description: The reflexscreen2 of reflex.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/reflex/add-reflex", [upload.fields([{
  name: 'reflexscreen1'
}, {
  name: 'reflexscreen2'
}])], _reflex.addReflex);
module.exports = app;