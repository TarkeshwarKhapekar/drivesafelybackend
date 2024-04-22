/*
 * @file: get-qol-result.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getQolResult } from "../../../controllers/qol";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/diagnostic/qol/result:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: search-config list api
 *   description: API used to Search Config List
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add declaration
 *         properties:
 *           QOL_value:
 *             type: string
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post(
  "/diagnostic/qol/result",
  getQolResult
);

export default app;
