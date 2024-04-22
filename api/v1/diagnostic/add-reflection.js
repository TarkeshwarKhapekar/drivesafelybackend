/*
 * @file: add-reflection.js
 * @description: It Contain add Observation router/api.
 * @author: Pankaj Chaudhari    
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addReflection } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/reflexaction/add-reflexaction:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add reflexaction api
 *   description: API used to Add reflexaction
 *   parameters:
 *      - in: body
 *        name: reflexaction
 *        description: The reflexaction to create.
 *        schema:
 *         type: object
 *         required:
 *          - add observation
 *         properties:
 *           declarationId:
 *             type: string
 *             required: true 
 *           time:
 *             type: number
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


// const addReflection = Joi.object({

// });

app.post(
    "/reflexaction/add-reflexaction",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addReflection
);

export default app;