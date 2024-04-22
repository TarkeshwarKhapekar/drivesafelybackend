/*
 * @file: update-content.js
 * @description: It Contain content  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateContent } from "../../../controllers/content";
import { storage } from "../../../utilities/multer";
const Thumbnails = require("../../../utilities/thumbnail");
const upload = multer({ storage: storage });


const app = express();
const validator = createValidator({ passError: true });

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


const contentSchema = Joi.object({
    title: Joi.string()
        .required()
        .label("title"),
});

app.post(
    "/content/update-content",
    [upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }])],
    Thumbnails.createThumbnails,
    // validator.body(userSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    updateContent
);

export default app;