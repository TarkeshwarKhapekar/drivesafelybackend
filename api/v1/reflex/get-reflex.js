/*
 * @file: get-reflex.js
 * @description: It Contain register reflex router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { getReflexScreen } from "../../../controllers/reflex";
const app = express();

/**
 * @swagger
 * /api/v1/reflex/get-reflex:
 *  get:
 *   tags: ["Reflex Management"]
 *   summary: get-reflex list api
 *   description: API used to Get Reflex
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  "/reflex/get-reflex",
  getReflexScreen
);

export default app;
