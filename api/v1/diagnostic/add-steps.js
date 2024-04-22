/*
 * @file: add-declaration.js
 * @description: It Contain add steps  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addSteps } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/steps/add-steps:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add steps api
 *   description: API used to Add Steps
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add steps
 *         properties:
 *           userId:
 *             type: string
 *             required: true 
 *           steps:
 *             type: number
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const declarationSchema = Joi.object({

});

app.post(
    "/steps/add-steps",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addSteps
);

export default app;