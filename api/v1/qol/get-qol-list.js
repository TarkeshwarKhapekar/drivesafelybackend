/*
 * @file: get-qol.js
 * @description: It Contain register qol router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import { getQolList } from "../../../controllers/qol";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/qol/search-config-list:
 *  post:
 *   tags: ["Qol Management"]
 *   summary: get-qol list api
 *   description: API used to Get Qol List
 *   parameters:
 *     - in: formData
 *       name: value
 *       type: number
 *       required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post(
  "/qol/search-config-list",
  getQolList
);

export default app;
