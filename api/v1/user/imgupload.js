/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { imgUpload } from "../../../controllers/user";

const app = express();
const validator = createValidator({ passError: true });

app.post(
  "/user/imgUpload",
  // validator.body(userSchema, {
  //   joi: { convert: true, allowUnknown: false }
  // }),
  imgUpload
);

export default app;
