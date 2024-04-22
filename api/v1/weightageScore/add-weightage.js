/*
 * @file: add-weightage.js
 * @description: It Contain add weightageScore  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import Joi from "@hapi/joi";
import { addWeightageScore } from "../../../controllers/weightageScore";

const app = express();


/**
 * @swagger
 * /api/v1/weightage/add-weightageScore:
 *  post:
 *   tags: ["Weightage Score"]
 *   summary: add weightage score api
 *   description: API used to Add Weightage Score
 *   parameters:
 *      - in: body
 *        name: weightage score
 *        description: The weightage score to create.
 *        schema:
 *         type: object
 *         required:
 *          - add weightage score
 *         properties:
 *           sleepScore:
 *             type: number
 *             required: false
 *           exerciseScore:
 *             type: number
 *             required: false
 *           stressScore:
 *             type: number
 *             required: false
 *           reflexScore:
 *             type: number
 *             required: false 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


// const corporateSchema = Joi.object({

// });

app.post(
    "/weightage/add-weightageScore",
    addWeightageScore
);

export default app;