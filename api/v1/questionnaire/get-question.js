/*
 * @file: get-question.js
 * @description: It Contain get question by id  router/api.
 * @author:  Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getQuestion } from "../../../controllers/questionnaire";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/questionnaire/get-question/{id}:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-questionnaire  api
 *   description:  API used to Get Question
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
  "/questionnaire/get-question/:id",
  // checkToken,
  getQuestion
);

export default app;
