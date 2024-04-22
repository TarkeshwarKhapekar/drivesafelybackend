/*
 * @file: get-qol.js
 * @description: It Contain register qol  router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getAllPolicy } from "../../../controllers/policy";
const app = express();

/**
 * @swagger
 * /api/v1/policy/get-All-Policy:
 *  get:
 *   tags: ["Policy"]
 *   summary: get-policy list api
 *   description: API used to Get policy
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/policy/get-All-Policy",
  getAllPolicy
);

export default app;
