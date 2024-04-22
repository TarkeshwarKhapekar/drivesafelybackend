/*
 * @file: get-content.js
 * @description: It Contain register content  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getContent } from "../../../controllers/content";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/content/get-content/{id}:
 *  get:
 *   tags: ["Content Management"]
 *   summary: get-content list api
 *   description: API used to Get Content
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
  "/content/get-content/:id",
  // checkToken,
  getContent
);

export default app;
