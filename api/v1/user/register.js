/*
 * @file: register.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { registerUser } from "../../../controllers/user";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/register:
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
 *           name:
 *             type: string
 *             required: true
 *           email:
 *             type: string
 *             required:  true
 *           phone:
 *             type: string
 *             required:  true
 *           corporateCode:
 *             type: string
 *             required:  false
 *           yearOfBirth:
 *             type: number
 *             required:  false
 *           height:
 *             type: number
 *             required:  false
 *           weight:
 *             type: number
 *             required:  false
 *           restingHeartRate:
 *             type: number
 *             required:  false 
 *           ringUse:
 *             type: boolean
 *             default: false
 *             required:  false
 *           ringId:
 *             type: string
 *             required:  false
 *           gender:
 *             type: string
 *             enum: ["MALE", "FEMALE", "OTHER"]
 *             required:  true
 *           password:
 *             type: string
 *             required:  true
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
 *           deviceToken:
 *              type: string
 *              required: false 
 *           roles:
 *             type: string
 *             enum: ["ADMIN","SUBADMIN", "DRIVER", "STAFF"]   
 *             required: true
 *             default: "DRIVER"
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
  roles: Joi.string()
    .valid("U", "C", "SP")
    .required()
    .label("Roles")
});

app.post(
  "/user/register",
  // validator.body(userSchema, {
  //   joi: { convert: true, allowUnknown: false }
  // }),
  registerUser
);

export default app;
