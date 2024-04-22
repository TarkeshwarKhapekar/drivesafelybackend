/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Pankaj Chaudhari
 */
import md5 from "md5";
import jwt from "jsonwebtoken";
import config from "config";
import { failAction } from "./response";
import Message from "./messages";
import USERMODEL from "./../collections/user"
const { jwtAlgo, jwtKey } = config.get("app");

export const getTimeStamp = () => {
  return Date.now();
};

// password encryption.
export const encryptpassword = password => {
  return md5(password);
};
// Generate random strings.
export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = "",
    keys = "";

  if (alphanumeric) {
    keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  } else {
    keys = "0123456789";
  }

  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};
/*********** Generate JWT token *************/
export const generateToken = data =>
  jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: "90d" });
/*********** Decode JWT token *************/
export const decodeToken = token => jwt.verify(token, jwtKey);
/*********** Verify token *************/
export const checkToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
    // console.log("decoded")
    // console.log(decoded)
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await USERMODEL.checkToken(token);
  if (user) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};
