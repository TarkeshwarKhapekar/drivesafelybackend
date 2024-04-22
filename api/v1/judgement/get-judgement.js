/*
 * @file: get-judgement.js
 * @description: It Contain get judgement by id router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { get } from "../../../controllers/judgement";
const app = express();

/**
 * @swagger
 * /api/v1/judgement/get-config/{id}:
 *  get:
 *   tags: ["Judgement Management"]
 *   summary: get-judgement list api
 *   description: API used to Get Judgement
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
  "/judgement/get-config/:id",
  get
);

export default app;
