/*
 * @file: update-judgement.js
 * @description: It Contain qol  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { storage } from "../../../utilities/multer";
import { update } from "../../../controllers/judgement";

const upload = multer({ storage: storage });


const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/judgement/update-config: 
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
    "/judgement/update-config",   
    update
);

export default app;