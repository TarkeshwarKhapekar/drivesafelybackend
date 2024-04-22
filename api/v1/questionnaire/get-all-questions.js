/*
 * @file: get-all-questions.js
 * @description: It Contain get all questionnaired list router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { getAllQuestions } from "../../../controllers/questionnaire";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/questionnaire/get-all-questions:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-all-questions list api
 *   description: API used to Get Questionnaire List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-all-questions",
    //   checkToken,
    getAllQuestions
);

export default app;
