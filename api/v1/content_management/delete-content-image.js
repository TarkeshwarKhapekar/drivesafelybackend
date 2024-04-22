/*
 * @file: delete-content-image.js
 * @description: It Contain delete content image router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { deleteContentImage } from "../../../controllers/content";
const app = express();

/**
 * @swagger
 * /api/v1/delete/content-image:
 *  delete:
 *   tags: ["Content Management"]
 *   summary: Content image delete  api
 *   description: API used to Delete content image
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
    "/delete/content-image",
    deleteContentImage
);

export default app;