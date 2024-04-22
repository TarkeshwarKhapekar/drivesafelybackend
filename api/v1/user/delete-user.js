/*
 * @file: delete-user.js
 * @description: It Contain delete user router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { deleteUser } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *  delete:
 *   tags: ["User"]
 *   summary: user delete  api
 *   description: API used to Delete User
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
    "/user/delete/:id",
    // validator.params(Schema, {
    //   joi: { convert: true, allowUnknown: false }
    // }),
    //   checkToken,
    deleteUser
);

export default app;