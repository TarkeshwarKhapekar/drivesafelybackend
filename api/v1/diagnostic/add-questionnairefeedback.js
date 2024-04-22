/*
 * @file: add-observation.js
 * @description: It Contain add Observation router/api.
 * @author: Pankaj Chaudhari    
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { saveQuestionnaireFeedback } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/questionnaire/add-questionnaire-feedback:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add observation api
 *   description: API used to Add Observation
 *   parameters:
 *      - in: body
 *        name: observation
 *        description: The observation to create.
 *        schema:
 *         type: object
 *         required:
 *          - add observation
 *         properties:
 *           declarationId:
 *             type: string
 *             required: true 
 *           count:
 *             type: number
 *             required: true 
 *           response:
 *             type: array
 *             items: 
 *                type: object
 *                properties:
 *                     questionName:
 *                       type: string
 *                       required: true
 *                     ansType:
 *                      type: string
 *                      required: true
 *                     options:
 *                        type: array
 *                        items: 
 *                           type: object
 *                           properties:
 *                                name:
 *                                 type: string
 *                                 required:
 *                                scoreVal:
 *                                 type: number
 *                                 required:
 *                                selected:
 *                                 type: boolean
 *                                 default: false
 *                                 required: 
 *                             
 *                      
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const declarationSchema = Joi.object({

});

app.post(
    "/questionnaire/add-questionnaire-feedback",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    saveQuestionnaireFeedback
);

export default app;