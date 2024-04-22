/*
 * @file: update-reflex.js
 * @description: It Contain update reflex router/api.
 * @author: Siddhant Singh
 */
const express = require("express");
const { createValidator, Joi } = require("express-joi-validation");
import { updateReflex } from "../../../controllers/reflex";
import { storage } from "../../../utilities/multer";
import multer from "multer";

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());

const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/reflex/update-reflex:
 *  post:
 *   tags: ["Reflex Management"]
 *   summary: reflex update api
 *   description: API used to Update Reflex
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: id
 *        description: The type of content.
 *        type: string
 *        required:
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


app.post(
    "/reflex/update-reflex",
    [upload.fields([{ name: 'reflexscreen1'}, { name: 'reflexscreen2' }])],
    updateReflex
);

export default app;