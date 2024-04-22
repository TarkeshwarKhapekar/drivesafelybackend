/*
 * @file: get-weightage-score.js
 * @description: It Contain register weightage score router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getWeightageScore } from "../../../controllers/weightageScore";
const app = express();

/**
 * @swagger
 * /api/v1/score/get-weightage-score:
 *  get:
 *   tags: ["Weightage Score"]
 *   summary: get-weightage-score list api
 *   description: API used to Get weightage-score
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/score/get-weightage-score",
  getWeightageScore
);

export default app;
