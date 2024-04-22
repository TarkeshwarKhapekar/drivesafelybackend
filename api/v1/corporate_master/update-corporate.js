/*
 * @file: update-corporate.js
 * @description: It Contain update corporate  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateCorporate } from "../../../controllers/corporate";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/corporate/update-corporate:
 *  post:
 *   tags: ["Corporate-Master"]
 *   summary: corporate update api
 *   description: API used to Update Corporate
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The corporate to update.
 *        schema:
 *         type: object
 *         required:
 *          - corporate update
 *         properties:
 *           _id:
 *             type: string
 *             required:
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
    name: Joi.string()
        .required()
        .label("name"),
    code: Joi.string()
        .required()
        .label("code"),
});

app.post(
    "/corporate/update-corporate",
    // validator.body(userSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    updateCorporate
);

export default app;