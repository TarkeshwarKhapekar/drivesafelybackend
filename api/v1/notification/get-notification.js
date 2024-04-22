/*
 * @file: get-notification.js
 * @description: It Contain get Notification by id  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getNotification } from "../../../controllers/notification";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/notification/get-notification/{id}:
 *  get:
 *   tags: ["Notification"]
 *   summary: get-notification list api
 *   description:  API used to Get Notification
 *   parameters:
 *     - in: path
 *       name: id
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/notification/get-notification/:id",
  // checkToken,
  getNotification
);

export default app;
