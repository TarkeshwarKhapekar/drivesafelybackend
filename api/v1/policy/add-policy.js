/*
 * @file: add-policy.js
 * @description: It Contain  policy  router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addPolicy } from "../../../controllers/policy";


const app = express();
app.use(express.json());

const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/policy/add-policy:
 *  post:
 *   tags: ["Policy"]
 *   summary: add policy api
 *   description: API used to Add Policy
 *   parameters:
 *      - in: body
 *        name: corporate
 *        description: The corporate to create.
 *        schema:
 *         type: object
 *         required:
 *          - add corporate
 *         properties:
 *           title:
 *             type: string
 *             required: false 
 *           titleJa:
 *             type: string
 *             required: false
 *           description:
 *             type: string
 *             required: false 
 *           descriptionJa:
 *             type: string
 *             required: false 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */



app.post(
    "/policy/add-policy",
    addPolicy
);

export default app;