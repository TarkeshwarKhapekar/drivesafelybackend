/*
 * @file: get-declaration.js
 * @description: It Contain get declaration by id router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getDeclaration } from "../../../controllers/diagnostic";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/declaration/get-declaration/{id}:
 *  get:
 *   tags: ["Declaration"]
 *   summary: get-declaration list api
 *   description: API used to Get Declaration
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
  "/declaration/get-declaration/:id",
  // checkToken,
  getDeclaration
);

export default app;
