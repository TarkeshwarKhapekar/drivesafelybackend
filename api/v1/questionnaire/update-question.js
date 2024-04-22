/*
 * @file: update-question.js
 * @description: It Contain update question  router/api.
 * @author:  Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateQuestion } from "../../../controllers/questionnaire";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/questionnaire/update-question:
 *  post:
 *   tags: ["MCQ"]
 *   summary: question update api
 *   description: API used to Update Question
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The question to update.
 *        schema:
 *         type: object
 *         required:
 *          - question update
 *         properties:
 *           _id:
 *             type: string
 *             required: true
 *           questionName:
 *             type: object
 *             properties:
 *                  en:
 *                    type: string
 *                    required:
 *                  ja:
 *                    type: string
 *                    required:    
 *           ansType:
 *             type: string
 *             required: false
 *           options:
 *             type: array
 *             items:
 *                type: object
 *                properties:
 *                     name:
 *                       type: object
 *                       properties:
 *                         en:
 *                           type: string
 *                           required:
 *                         ja:
 *                           type: string
 *                           required:
 *                     scoreVal:
 *                       type: number
 *                       required:  
 *             
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */




const notificationSchema = Joi.object({
    message: Joi.string()
        .required()
        .label("message"),
    title: Joi.string()
        .required()
        .label("title"),
});
// /api/v1/questionnaire/update-question:
app.post(
    "/questionnaire/update-question",
    // validator.body(userSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    updateQuestion
);

export default app;