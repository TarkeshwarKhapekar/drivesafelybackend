/*
 * @file: delete-corporate.js
 * @description: It Contain delete corporate router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { deleteCorporate } from "../../../controllers/corporate";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/corporate/delete/{id}:
 *  delete:
 *   tags: ["Corporate-Master"]
 *   summary: corporate delete  api
 *   description: API used to Delete Corporate
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
    "/corporate/delete/:id",
    // validator.params(Schema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    //   checkToken,
    deleteCorporate
);

export default app;