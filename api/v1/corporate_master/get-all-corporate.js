/*
 * @file: get-all-corporate.js
 * @description: It Contain get all corporate list router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { getAllCorporate } from "../../../controllers/corporate";
const app = express();
import { checkToken } from "../../../utilities/universal";

/**
 * @swagger
 * /api/v1/corporate/get-all-corporate:
 *  get:
 *   tags: ["Corporate-Master"]
 *   summary: get-all-corporate list api
 *   description: API used to Get Corporate List
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/corporate/get-all-corporate",
    //   checkToken,
    getAllCorporate
);

export default app;
