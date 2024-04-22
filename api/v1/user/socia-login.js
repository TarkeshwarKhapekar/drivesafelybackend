/*
 * @file: social-login.js
 * @description: It Contain login router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { socialLogin } from "../../../controllers/user";
import { DEVICE } from "../../../utilities/constants";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * 
 * /api/v1/user/social-login:
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
 *           socialToken:
 *             type: string
 *             required:
 *           email:
 *             type: string
 *             required:
 *           roles:
 *             type: string
 *             required:
 *           loginType:
 *             type: string
 *             required:
 *           termsCondition:
 *             type: boolean
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
    socialToken: Joi.string()
        .required()
        .label("Social Token"),
    roles: Joi.string()
        .required()
        .label("Role"),
    email: Joi.string()
        .email()
        .required()
        .label("Email"),
    termsCondition: Joi.boolean()
        .optional()
        .allow(""),
    loginType: Joi.string()
        .required()
        .label("Login Type")
        .valid("google","facebook","apple")
});

app.post(
    "/user/social-login",
    validator.body(userSchema, {
        joi: { convert: true, allowUnknown: false }
    }),
    socialLogin
);

export default app;
