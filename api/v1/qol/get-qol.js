/*
 * @file: get-qol.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getQol } from "../../../controllers/qol";
const app = express();

/**
 * @swagger
 * /api/v1/qol/get-config/{id}:
 *  get:
 *   tags: ["Qol Management"]
 *   summary: get-config list api
 *   description: API used to Get Qol
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
  "/qol/get-config/:id",
  getQol
);

export default app;
