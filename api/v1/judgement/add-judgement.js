const express = require("express");
const { createValidator, Joi } = require("express-joi-validation");
const { add } = require("../../../controllers/judgement");
// import { storage } from "../../../utilities/multer";
// import multer from "multer";

// const upload = multer({ storage: storage });

const app = express();
app.use(express.json());

const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/judgement/add-config: 
 *  post:
 *   tags: ["Judgement Management"]
 *   summary: add config api
 *   description: API used to Add Config
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: min_value
 *        description: The type of config.
 *        type: number
 *        required: false
 *      - in: formData
 *        name: max_value
 *        description: The type of config.
 *        type: number
 *        required: false 
 *      - in: formData
 *        name: colorCode
 *        description: The colorCode of config.
 *        type: string
 *      - in: formData
 *        name: level
 *        description: The type of config.
 *        type: string
 *        required: false 
 *      - in: formData
 *        name: description
 *        description: The type of config.
 *        type: string
 *        required: false 
 *      - in: formData
 *        name: title
 *        description: The title of config.
 *        type: string
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.post(
  "/judgement/add-config",
  // [upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }])],
//   validator.body(Joi.object({
//     min_Value: Joi.string().required()
//   })),
  add
);

module.exports = app;
