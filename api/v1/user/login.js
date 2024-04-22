/*
 * @file: signinUser.js
 * @description: It Contain login router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { login } from "../../../controllers/user";
import { DEVICE } from "../../../utilities/constants";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/signinUser:
 *  post:
 *   tags: ["User"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           deviceToken:
 *             type: string
 *             required:
 *           fcmToken:
 *             type: string
 *             required:
 *           loginType:
 *             type: string
 *             enum: ["ADMIN", "DRIVER", "STAFF"]   
 *             required: true
 *             default: "DRIVER"
 *           language:
 *             type: string
 *             enum: ["English", "Japaneses"]   
 *             required: false
 *             default: "English"
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password"),
  loginType: Joi.string()
    .trim()
    .required()
    .label("Type"),
});

app.post(
  "/user/signinUser",
  // validator.body(userSchema, {
  //   joi: { convert: true, allowUnknown: false }
  // }),
  login
);

export default app;
