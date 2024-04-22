/*
 * @file: add-observation.js
 * @description: It Contain add Observation router/api.
 * @author: Pankaj Chaudhari    
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addObservation } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/observation/add-observation:
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
 *           ringToken:
 *             type: string
 *             required: false 
 *           deviceType:
 *             type: string
 *             required: true 
 *           pulse:
 *             type: number
 *             required: false
 *           pulseVariation:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 pulse:
 *                   type: number
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *           QOL:
 *             type: string
 *             required: false
 *           steps:
 *             type: number
 *             required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const declarationSchema = Joi.object({

});

app.post(
    "/observation/add-observation",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addObservation
);

export default app;