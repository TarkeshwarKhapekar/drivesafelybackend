/*
 * @file: delete-qol.js
 * @description: It Contain delete qol router/api.
 * @author: Siddhant Singh
 */
import express from "express";
import { deleteQol } from "../../../controllers/qol";
const app = express();

/**
 * @swagger
 * /api/v1/qol/delete/{id}:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: qol delete  api
 *   description: API used to Delete Qol
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
    "/qol/delete/:id",
    deleteQol
);

export default app;