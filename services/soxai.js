/*
 * @file: USERMODEL.js
 * @description: It Contain function layer for user service.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import USERMODEL from "../collections/user";
import Message from "../utilities/messages";
import {
  encryptpassword,
  generateToken,
  generateRandom,
  getTimeStamp,
} from "../utilities/universal";
import * as COMMON from "./common";
import * as Mail from "../utilities/mail";
import config from "config";


async function getRingToken(email, password) {
   
  const axios = require('axios');
  let token ;

  const payload = {
          "email": email,
          "password": password,
          "returnSecureToken": true
  };
  const url = "https://soxai-firebase.df.r.appspot.com/api/login";

try {
  const response = await axios.post(url, payload);
  token = response.data.refreshToken;
  console.log(token);
} catch (error) {
  console.log(error);
}
// console.log(token);
return token;
}

/********** Login users **********/
export const soxaiLogin = async (payload,res) => {
    const {email,password} = payload;
  console.log(payload, "payload344");
  const userId = payload.userId;
  // Check if the provided credentials match any user in the database
 
  const token = await getRingToken(email, password);
  console.log("token",token);

  // update profile

  const query = { _id: mongoose.Types.ObjectId(userId) }
  let data = {
    ringToken: {
      token: token,
      lastLogin:new Date()
    }
    
  };
  let saveUser = await USERMODEL.findOneAndUpdate(query, data, { fields: { loginToken: 0, createdAt: 0, updatedAt: 0, password: 0 }, new: true });


  // If the login is successful, construct the response with the static data
  const response = {
    refreshToken: token,
  };

  return response;
};
