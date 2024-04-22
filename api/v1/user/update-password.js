/*
 * @file: change-password.js
 * @description: It Contain login router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updatePassword } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkToken } from "../../../utilities/universal";


/**
 * @swagger
 * /api/v1/user/update-password:
 *  post:
 *   tags: ["User"]
 *   summary: update password
 *   description: api used to reset password
 *   parameters:
 *      - in: header
 *        name: authorization
 *        required:
 *      - in: body
 *        name: user
 *        description: api used update password
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           confirmPassword:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
//   currentpwd: Joi.string()
//   .required()
//   .label("Old Password"),
//   password: Joi.string()
//   .required()
//   .label("New Password"),
//   confirmPassword: Joi.string()
//   .required()
//   .label("Confirm Password")
});

app.post(
  "/user/update-password",
//   validator.body(userSchema, {
//     joi: { convert: true, allowUnknown: false }
//   }),
//   checkToken,
  updatePassword
);

export default app;
