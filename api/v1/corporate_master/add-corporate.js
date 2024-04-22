/*
 * @file: add-corporate.js
 * @description: It Contain add corporate  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addCorporate } from "../../../controllers/corporate";

const app = express();
const validator = createValidator({ passError: true });


/**
 * @swagger
 * /api/v1/corporate/add-corporate:
 *  post:
 *   tags: ["Corporate-Master"]
 *   summary: add corporate api
 *   description: API used to Add Corporate
 *   parameters:
 *      - in: body
 *        name: corporate
 *        description: The corporate to create.
 *        schema:
 *         type: object
 *         required:
 *          - add corporate
 *         properties:
 *           name:
 *             type: string
 *             required: true 
 *           code:
 *             type: string
 *             required: true 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const corporateSchema = Joi.object({

});

app.post(
    "/corporate/add-corporate",
    // validator.body(declarationSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    addCorporate
);

export default app;