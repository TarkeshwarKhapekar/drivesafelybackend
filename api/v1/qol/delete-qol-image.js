/*
 * @file: delete-image.js
 * @description: It Contain delete qol image router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { deleteQolImage } from "../../../controllers/qol";
const app = express();

/**
 * @swagger
 * /api/v1/delete/qol-image:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: Qol image delete  api
 *   description: API used to Delete Qol image
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: images
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
    "/delete/qol-image",
    deleteQolImage
);

export default app;