/*
 * @file: soxai.js
 * @description: It Contain function layer for soxai controller.
 * @author: Siddhant Singh
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/soxai";
import Message from "../utilities/messages";

/**************** Login user ***********/
export const soxaiLogin = async (req, res, next) => {
    console.log("soxai")
    const payload = req.body;
    const user  = req.user;
    Object.assign(payload,{userId:user.userId})
    console.log(req)
    try {
      const data = await SERVICE.soxaiLogin(payload,user);
      res.status(200).json(successAction(data, Message.success));
    } catch (error) {
      res.status(200).json(failAction(error.message));
    }
  };