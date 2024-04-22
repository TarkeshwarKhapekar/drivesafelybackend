/*
 * @file: notification.js
 * @description: It Contain function layer for notification service.
 * @author: Manas Agrawal
 */

import mongoose from "mongoose";
import REFLEXMODEL from "../collections/reflex";
import Message from "../utilities/messages";
import {
    encryptpassword,
    generateToken,
    generateRandom,
    getTimeStamp
} from "../utilities/universal";
import * as COMMON from "./common";
import * as Mail from "../utilities/mail";
import config from "config";
import mailchimp from '@mailchimp/mailchimp_marketing';
const { mailchimp_key, mailchimp_audience_id } = config.get('app');

mailchimp.setConfig({
    apiKey: mailchimp_key,
    server: 'us2',
});

const { frontendUrl } = config.get("app");
const formidable = require("formidable");
const form = formidable({ multiples: true });


/********** Save notification **********/
export const saveReflexScreen = async (payload) => {
    let saveData = await REFLEXMODEL.saveReflexScreen(payload);
    console.log(saveData)
    return saveData
};

/********** Get Reflex Screen **********/
export const getReflexScreen = async (payload) => {
    const queryObj = REFLEXMODEL.find();
    return await queryObj
};

/********** Update Reflex **********/
export const updateReflex = async (payload) => {
  const { _id, reflexscreen1, reflexscreen2 } = payload;

  const updateFields = {};

  if (typeof reflexscreen1 === 'string' && reflexscreen1.trim() !== '') {
    updateFields.reflexscreen1 = reflexscreen1;
  }

  if (typeof reflexscreen2 === 'string' && reflexscreen2.trim() !== '') {
    updateFields.reflexscreen2 = reflexscreen2;
  }

  if (Object.keys(updateFields).length === 0) {
    // No valid fields to update, return early
    return null;
  }

  const data = await REFLEXMODEL.findByIdAndUpdate(
    { _id: _id },
    {
      $set: updateFields,
    },
    { new: true }
  );

  return data;
};

  

  export const deleteReflexImage = async (payload) => {
    const { id, image, identifier} = payload;
    console.log(payload, "payload");

    let delImg ;
    if(identifier == 'img1'){
      delImg = {
        $unset: {
          reflexscreen1: image
        }
      };
    }

    if(identifier == 'img2'){
      delImg = {
        $unset: {
          reflexscreen2: image
        }
      };
    }
  
    const data = await REFLEXMODEL.findByIdAndUpdate(
      {_id:mongoose.Types.ObjectId(id)},
      delImg,
      { new: true }
    );
  
    console.log(data, "data");
    return data;
  };
  