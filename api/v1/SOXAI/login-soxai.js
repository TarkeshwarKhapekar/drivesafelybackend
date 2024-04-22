/*
 * @file: login-soxai.js
 * @description: It Contain soxai login router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { soxaiLogin } from "../../../controllers/soxai";
import { checkToken } from "../../../utilities/universal";
const app = express();
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/soxai/user/login:
 *  post:
 *   tags: ["SOXAI"]
 *   summary: soxai user login api
 *   description: api used to soxai login users
 *   parameters:
 *      - in: header
 *        name: authorization
 *      - in: body
 *        name: user
 *        description: The soxai user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.post(
  "/soxai/user/login",
  checkToken,
  soxaiLogin
);

export default app;
