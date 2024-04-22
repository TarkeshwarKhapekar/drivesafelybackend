/*
 * @file: add-declaration.js
 * @description: It Contain add Declaration  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addDeclaration } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/declaration/add-declaration:
 *  post:
 *   tags: ["Diagnostic"]
 *   summary: add declaration api
 *   description: API used to Add Declaration
 *   parameters:
 *      - in: body
 *        name: declaration
 *        description: The declaration to create.
 *        schema:
 *         type: object
 *         required:
 *          - add declaration
 *         properties:
 *           userId:
 *             type: string
 *             required: true 
 *           bedTime:
 *             type: string
 *             required: true 
 *           wake_upTime:
 *             type: string
 *             required: true 
 *           meal:
 *             type: array
 *             items:
 *                type: string
 *           physical_condition:
 *             type: string
 *             required: true
 *             enum: ["Good", "Bad"]
 *           fatigue_existence:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           do_meditation:
 *             type: string
 *             required: true
 *             enum: ['Yes', 'No']
 *           memo:
 *             type: string
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
    "/declaration/add-declaration",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addDeclaration
);

export default app;