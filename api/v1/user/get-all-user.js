/*
 * @file: get-all-user.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { getAllUser } from "../../../controllers/user";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/user/get-all-user:
 *  get:
 *   tags: ["User"]
 *   summary: get-all-user list api
 *   description: api used to get users type list
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/user/get-all-user",
  checkToken,
 getAllUser);

export default app;
