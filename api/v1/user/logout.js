/*
 * @file: logout.js
 * @description: It Contain logout router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { logout } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";

const app = express();

/**
 * @swagger
 * /api/v1/user/logout:
 *  post:
 *   tags: ["User"]
 *   summary: user logout api
 *   description: api used to logout users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post("/user/logout",
 checkToken,
 logout);

export default app;
