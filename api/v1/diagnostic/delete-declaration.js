/*
 * @file: delete-declaration.js
 * @description: It Contain delete declaration router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { deleteDeclaration } from "../../../controllers/diagnostic";
const app = express();

/**
 * @swagger
 * /api/v1/declaration/delete/{id}:
 *  delete:
 *   tags: ["Declaration"]
 *   summary: declaration delete  api
 *   description: API used to Delete Declaration
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
    "/declaration/delete/:id",
    deleteDeclaration
);

export default app;