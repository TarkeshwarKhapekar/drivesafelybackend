/*
 * @file: get-all-declaration.js
 * @description: It Contain get all declaration list router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { getAllDeclaration } from "../../../controllers/diagnostic";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/declaration/get-all-declaration:
 *  get:
 *   tags: ["Declaration"]
 *   summary: get-all-declaration list api
 *   description: API used to Get Declaration List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/declaration/get-all-declaration",
    //   checkToken,
    getAllDeclaration
);

export default app;
