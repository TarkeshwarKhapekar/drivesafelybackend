/*
 * @file: verify-otp.js
 * @description: It Contain otp verify router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { verifyOTP } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkToken } from "../../../utilities/universal";
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/verify-otp:
 *  post:
 *   tags: ["User"]
 *   summary: update user status api
 *   description: Api to used Update the status of user
 *   parameters:
 *      - in: body
 *        name: user
 *        description: Api to used Update the status of user
 *        schema:
 *         type: object
 *         required:
 *          - Verify OTP
 *         properties:
 *           _id:
 *             type: string
 *             required:
 *           otp:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
//   id: Joi.string()
//         .required()
//         .label("Id"),
//   status: Joi.boolean().required()
});

app.post(
  "/user/verify-otp",
//   validator.body(userSchema, {
//     joi: { convert: true, allowUnknown: false }
//   }),
//   checkToken,
verifyOTP
);

export default app;
