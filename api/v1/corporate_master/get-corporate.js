/*
 * @file: get-corporate.js
 * @description: It Contain get corporate by id router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getCorporate } from "../../../controllers/corporate";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/corporate/get-corporate/{id}:
 *  get:
 *   tags: ["Corporate-Master"]
 *   summary: get-corporate list api
 *   description: API used to Get Corporate
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
  "/corporate/get-corporate/:id",
  // checkToken,
  getCorporate
);

export default app;
