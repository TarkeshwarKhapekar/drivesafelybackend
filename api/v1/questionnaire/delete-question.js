/*
 * @file: delete-question.js
 * @description: It Contain delete question router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { deleteQuestion } from "../../../controllers/questionnaire";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/questionnaire/delete/{id}:
 *  delete:
 *   tags: ["MCQ"]
 *   summary: question delete  api
 *   description: API used to Delete Question
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *         description: The question ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = Joi.object({
    id: Joi.string().required().label("Id"),
});

app.delete(
    "/questionnaire/delete/:id",
    // validator.params(Schema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    //   checkToken,
    deleteQuestion
);

export default app;