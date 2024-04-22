/*
 * @file: delete-image.js
 * @description: It Contain delete notification image router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { deleteImage } from "../../../controllers/notification";
const app = express();

/**
 * @swagger
 * /api/v1/image/delete:
 *  delete:
 *   tags: ["Notification"]
 *   summary: notification delete  api
 *   description: API used to Delete Notification
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: image
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


app.delete(
    "/image/delete",
    deleteImage
);

export default app;