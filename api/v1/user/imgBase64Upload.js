/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: Pankaj Chaudhari
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import { imgBase64Upload } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";
import Joi from "@hapi/joi";
const app = express();
const validator = createValidator({ passError: true });

const userSchema = Joi.object({
  image: Joi.string()
    .required()
    .label("Image"),
  imgLocation: Joi.string()
    .required()
    .label("Image location"),

});

app.post(
  "/user/imgBase64Upload",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  imgBase64Upload
);

export default app;
