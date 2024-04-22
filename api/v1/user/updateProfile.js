/*
 * @file: updateProfile.js
 * @description: It Contain updateProfile User  router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateProfile } from "../../../controllers/user";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/update-profile:
 *  post:
 *   tags: ["User"]
 *   summary: user register api
 *   description: api used to register users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user register
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           name:
 *             type: string
 *             required: false
 *           email:
 *             type: string
 *             required:  false
 *           phone:
 *             type: string
 *             required:  false
 *           gender:
 *             type: string
 *             enum: ["MALE", "FEMALE", "OTHER"]
 *             required:  false
 *           password:
 *             type: string
 *             required:  false
 *           confirm_password:
 *             type: string
 *             required:
 *           status:
 *              type: string
 *              required: false
 *              enum: ['active', 'deactive']
 *              default: 'active'
 *           deviceType:
 *              type: string
 *              required: true
 *              enum: ['web', 'ios', 'android']
 *              default: 'web'
 *           language:
 *              type: string
 *              required: false
 *              enum: ['English', 'Japanese']
 *              default: 'English'
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */



const userSchema = Joi.object({
  name: Joi.string()
    .required()
    .label("user name"),
  t_c: Joi.boolean()
    .optional()
    .allow("")
    .label("t_c"),
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password"),
  confirm_password: Joi.string()
    .optional()
    .allow("")
    .label("Confirm Password"),
});

app.post(
  "/user/update-profile",
  // validator.body(userSchema, {
  //   joi: { convert: true, allowUnknown: false }
  // }),
  updateProfile
);

export default app;