/*
 * @file: get-all-questionsbycount.js
 * @description: It Contain get all questionnaired list router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { getAllQuestionsBycount } from "../../../controllers/questionnaire";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/questionnaire/get-all-questionsBycount/{count}:
 *  get:
 *   tags: ["MCQ"]
 *   summary: get-all-questions list api
 *   description: API used to Get Questionnaire List
 *   parameters:
 *     - in: path
 *       name: count
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/questionnaire/get-all-questionsBycount/:id",
    //   checkToken,
    getAllQuestionsBycount
);

export default app;
