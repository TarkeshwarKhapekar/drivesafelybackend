/*
 * @file: delete-notification.js
 * @description: It Contain delete notification router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { deleteNotification } from "../../../controllers/notification";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/notification/delete/{id}:
 *  delete:
 *   tags: ["Notification"]
 *   summary: notification delete  api
 *   description: API used to Delete Notification
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = Joi.object({
    id: Joi.string().required().label("Id"),
});

app.delete(
    "/notification/delete/:id",
    // validator.params(Schema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    //   checkToken,
    deleteNotification
);

export default app;