/*
 * @file: login.js
 * @description: It Contain login router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateStatus } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkToken } from "../../../utilities/universal";
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/updateStatus:
 *  put:
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
 *          - Admin login
 *         properties:
 *           id:
 *             type: string
 *             required:
 *           status:
 *             type: boolean
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  id: Joi.string()
        .required()
        .label("Id"),
  status: Joi.boolean().required()
});

app.put(
  "/user/updateStatus",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateStatus
);

export default app;
