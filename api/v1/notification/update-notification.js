/*
 * @file: update-notification.js
 * @description: It Contain update notification  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateNotification } from "../../../controllers/notification";
import { storage } from "../../../utilities/multer";

const upload = multer({ storage: storage });

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/notification/update-notification:
 *  post:
 *   tags: ["Notification"]
 *   summary: notification update api
 *   description: API used to Update Notification
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *      - in: formData
 *        name: id
 *        description: The type of notification.
 *        type: string
 *        required:
 *      - in: formData
 *        name: type
 *        description: The type of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        description: The title of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: message
 *        description: The message of notification.
 *        type: string
 *        required: true
 *      - in: formData
 *        name: image
 *        description: The image of notification.
 *        type: file
 *        required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */



const notificationSchema = Joi.object({
    message: Joi.string()
        .required()
        .label("message"),
    title: Joi.string()
        .required()
        .label("title"),
});

app.post(
    "/notification/update-notification",
    [upload.fields([{ name: 'image', maxCount: 10 }])],
    // validator.body(userSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    updateNotification
);

export default app;