/*
 * @file: get-all-content.js
 * @description: It Contain get content list router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { getAllContent } from "../../../controllers/content";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/content/get-all-content:
 *  get:
 *   tags: ["Content Management"]
 *   summary: get-all-content list api
 *   description: API used to Get Content List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/content/get-all-content",
    //   checkToken,
    getAllContent
);

export default app;
