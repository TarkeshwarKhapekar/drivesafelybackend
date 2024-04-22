/*
 * @file: delete-image.js
 * @description: It Contain delete reflex image router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { deleteReflexImage } from "../../../controllers/reflex";
const app = express();

/**
 * @swagger
 * /api/v1/delete/reflex-image:
 *  delete:
 *   tags: ["Reflex Management"]
 *   summary: reflex image delete  api
 *   description: API used to Delete Reflex image
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: reflexscreen1
 *        required: true
 *        schema:
 *         type: string
 *         description: The user ID
 *      - in: body
 *        name: reflexscreen2
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
    "/delete/reflex-image",
    deleteReflexImage
);

export default app;