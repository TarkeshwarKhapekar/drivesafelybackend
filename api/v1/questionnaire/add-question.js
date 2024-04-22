/*
 * @file: add-question.js
 * @description: It Contain add question router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addQuestion } from "../../../controllers/questionnaire";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/questionnaire/add-question:
 *  post:
 *   tags: ["MCQ"]
 *   summary: add question api
 *   description: API used to Add question
 *   parameters:
 *      - in: body
 *        name: question
 *        description: The question to create.
 *        schema:
 *         type: object
 *         required:
 *          - add question
 *         properties:
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
        .label("title")
});

app.post(
    "/questionnaire/add-question",
    // validator.body(notificationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addQuestion
);

export default app;