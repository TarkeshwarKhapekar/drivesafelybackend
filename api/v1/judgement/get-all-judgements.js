/*
 * @file: judgement.js
 * @description: It Contain get judgement's  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getAll } from "../../../controllers/judgement";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/judgement/get-All-config:
 *  get:
 *   tags: ["Judgement Management"]
 *   summary: get-config list api
 *   description: API used to Get Content
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/judgement/get-All-config",
  getAll
);

export default app;
