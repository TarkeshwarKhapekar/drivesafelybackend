/*
 * @file: update-wightage-score.js
 * @description: It Contain update score router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { updateWeightageScore } from "../../../controllers/weightageScore";

const app = express();

/**
 * @swagger
 * /api/v1/score/update-weightage-score:
 *  post:
 *   tags: ["Weightage Score"]
 *   summary: score update api
 *   description: API used to Update score
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The score to update.
 *        schema:
 *         type: object
 *         required:
 *          - score update
 *         properties:
 *           _id:
 *             type: string
 *             required:
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


app.post(
    "/score/update-weightage-score",
    updateWeightageScore
);

export default app;