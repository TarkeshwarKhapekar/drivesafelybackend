/*
 * @file: get-qol.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getAllQol } from "../../../controllers/qol";
const app = express();

/**
 * @swagger
 * /api/v1/qol/get-All-Config:
 *  get:
 *   tags: ["Qol Management"]
 *   summary: get-config list api
 *   description: API used to Get Qol
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/qol/get-All-Config",
  getAllQol
);

export default app;
