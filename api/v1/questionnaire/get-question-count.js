/*
 * @file: get-all-questions.js
 * @description: It Contain get all questionnaired list router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { getAllQuestionsCount } from "../../../controllers/questionnaire";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/questionnaire/get-questions-count:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-all-questions count api
 *   description: API used to Get Questionnaire count
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-questions-count",
    //   checkToken,
    getAllQuestionsCount
);

export default app;
