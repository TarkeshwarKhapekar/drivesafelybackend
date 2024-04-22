/*
 * @file: delete-content-video.js
 * @description: It Contain delete content video router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import { deleteContentVideo } from "../../../controllers/content";
const app = express();

/**
 * @swagger
 * /api/v1/delete/content-video:
 *  delete:
 *   tags: ["Content Management"]
 *   summary: Content video delete  api
 *   description: API used to Delete content video
 *   parameters:
 *      - in: body
 *        name: id
 *        required: true
 *      - in: body
 *        name: videos
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
    "/delete/content-video",
    deleteContentVideo
);

export default app;