/*
 * @file: update-declaration.js
 * @description: It Contain update declaration  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateDeclaration } from "../../../controllers/diagnostic";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/declaration/update-declaration:
 *  post:
 *   tags: ["Declaration"]
 *   summary: declaration update api
 *   description: API used to Update Declaration
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The declaration to update.
 *        schema:
 *         type: object
 *         required:
 *          - declaration update
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           bedTime:
 *             type: string
 *             required: true
 *           wake_upTime:
 *             type: string
 *             required: true
 *           meal:
 *             type: string
 *             required: false
 *             enum: ["Breakfast", "Lunch", "Dinner", "Other"]
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



const notificationSchema = Joi.object({

});

app.post(
    "/declaration/update-declaration",
    // validator.body(userSchema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    updateDeclaration
);

export default app;