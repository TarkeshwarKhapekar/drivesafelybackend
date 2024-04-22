/*
 * @file: add-notification.js
 * @description: It Contain add notification router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addNotification } from "../../../controllers/notification";
import { storage } from "../../../utilities/multer";

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/notification/add-notification:
 *  post:
 *   tags: ["Notification"]
 *   summary: add notification api
 *   description: API used to Add Notification
 *   consumes:
 *    - multipart/form-data
 *   parameters:
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
        .label("title")
});

app.post(
    "/notification/add-notification",
    [upload.fields([{ name: 'image', maxCount: 10 }])],
    // validator.body(notificationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addNotification
);

export default app;