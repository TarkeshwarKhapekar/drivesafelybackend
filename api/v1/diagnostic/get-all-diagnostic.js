/*
 * @file: get-all-diagnostic.js
 * @description: It Contain get all diagnostic by id router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getAllDiagnosticByUser } from "../../../controllers/diagnostic";
const app = express();

/**
 * @swagger
 * /api/v1/diagnostic/get-all-diagnostic:
 *  get:
 *   tags: ["Diagnostic"]
 *   summary: get-all-diagnostic list api
 *   description: API used to Get All Diagnostic
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/diagnostic/get-all-diagnostic",
  getAllDiagnosticByUser
);

export default app;
