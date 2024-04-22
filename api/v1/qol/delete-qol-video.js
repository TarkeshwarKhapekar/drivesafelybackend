/*
 * @file: delete-qol-video.js
 * @description: It Contain delete qol video router/api.
 * @author: Siddhant Singh 
 */
import express from "express";
import {deleteQolVideo } from "../../../controllers/qol";
const app = express();

/**
 * @swagger
 * /api/v1/delete/qol-video:
 *  delete:
 *   tags: ["Qol Management"]
 *   summary: Qol video delete  api
 *   description: API used to Delete Qol video
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
    "/delete/qol-video",
    deleteQolVideo
);

export default app;