/*
 * @file: update-corporate.js
 * @description: It Contain update corporate  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { updatePolicy } from "../../../controllers/policy";

const app = express();

/**
 * @swagger
 * /api/v1/policy/update-policy:
 *  post:
 *   tags: ["Policy"]
 *   summary: corporate update api
 *   description: API used to Update Corporate
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The corporate to update.
 *        schema:
 *         type: object
 *         required:
 *          - corporate update
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           title:
 *             type: string
 *             required: false
 *           titleJa:
 *             type: string
 *             required: false
 *           description:
 *             type: string
 *             required: false
 *           descriptionJa:
 *             type: string
 *             required: false
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.post(
    "/policy/update-policy",
    updatePolicy
);

export default app;