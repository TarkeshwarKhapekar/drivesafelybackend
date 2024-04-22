/*
 * @file: get-profile.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getProfile } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/get-profile/{id}:
 *  get:
 *   tags: ["User"]
 *   summary: get-profile list api
 *   description: api used to get profile
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
  "/user/get-profile/:id",
  // checkToken,
  getProfile
);

export default app;
