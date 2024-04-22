/*
 * @file: get-diagnostic.js
 * @description: It Contain get diagnostic by id router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import { getDiagnostic } from "../../../controllers/diagnostic";
const app = express();

/**
 * @swagger
 * /api/v1/diagnostic/get-diagnostic/{id}:
 *  get:
 *   tags: ["Diagnostic"]
 *   summary: get-diagnostic list api
 *   description: API used to Get Diagnostic
 *   parameters:
 *     - in: path
 *       name: id
 *       required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/diagnostic/get-diagnostic/:id",
  getDiagnostic
);

export default app;
