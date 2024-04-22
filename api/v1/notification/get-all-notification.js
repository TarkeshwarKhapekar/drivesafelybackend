/*
 * @file: get-all-notification.js
 * @description: It Contain get all notification list router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { getAllNotification } from "../../../controllers/notification";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/notification/get-all-notification:
 *  get:
 *   tags: ["Notification"]
 *   summary: get-all-notification list api
 *   description: API used to Get Notification List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/notification/get-all-notification",
    //   checkToken,
    getAllNotification
);

export default app;
