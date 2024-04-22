/*
 * @file: delete-content.js
 * @description: It Contain delete content router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { deleteContent } from "../../../controllers/content";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/content/delete/{id}:
 *  delete:
 *   tags: ["Content Management"]
 *   summary: content delete  api
 *   description: API used to Delete Content
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

const Schema = Joi.object({
    id: Joi.string().required().label("Id"),
});

app.delete(
    "/content/delete/:id",
    // validator.params(Schema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    //   checkToken,
    deleteContent
);

export default app;