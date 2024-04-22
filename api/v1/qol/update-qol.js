/*
 * @file: update-qol.js
 * @description: It Contain qol  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { storage } from "../../../utilities/multer";
import { updateQol } from "../../../controllers/qol";
const Thumbnails = require("../../../utilities/thumbnail");
const upload = multer({ storage: storage });


const app = express();
const validator = createValidator({ passError: true });

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



app.post(
    "/qol/update-config",
    [upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }])],
    Thumbnails.createThumbnails,
    updateQol
);

export default app;