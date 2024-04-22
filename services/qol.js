/*
 * @file: qol.js
 * @description: It Contain function layer for qol service.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import QOLMODEL from "../collections/qol";
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
import mailchimp from "@mailchimp/mailchimp_marketing";
const { mailchimp_key, mailchimp_audience_id } = config.get("app");

mailchimp.setConfig({
  apiKey: mailchimp_key,
  server: "us2",
});

const { frontendUrl } = config.get("app");
const formidable = require("formidable");
const form = formidable({ multiples: true });

/********** Save qol **********/
export const saveQol = async (payload) => {
  let saveData = await QOLMODEL.saveQol(payload);
  return {
    saveData,
  };
};

/********** Get qol by id **********/
export const getAllQol = async (payload) => {
  let sort = { [payload.sortBy ? payload.sortBy : "createdAt"]: -1 };
  let limit = payload.count ? JSON.parse(payload.count) : 20;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);

  let matchObj = {
    isDeleted: false,
  };

  /****************Condition to check Search Parameters****************/
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{ description: { $regex: regex } }],
    };
  }

  // Add filter based on the 'type' field
  if (payload.type) {
    matchObj = {
      ...matchObj,
      type: payload.type,
    };
  }
  const queryObj = QOLMODEL.find(matchObj, {
    type: 1,
    title: 1,
    description: 1,
    min_value: 1,
    max_value: 1,
    level: 1,
    createdAt: 1,
  });
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length,
  };
};

/********** Get qol by id **********/
export const getQol = async (payload) => {
  let matchObj = { _id: mongoose.Types.ObjectId(payload.id) };
  const queryObj = QOLMODEL.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0,
  });
  return await queryObj;
};

/********** Update qol **********/
export const updateQol = async (payload) => {
  return await QOLMODEL.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(payload.id),
    },
    payload,
    { new: true }
  );
};

/********** Delete Content **********/
export const deleteQol = async (payload) => {
  return await QOLMODEL.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(payload.id) },
    { isDeleted: true },
    { fields: { _id: 1 }, new: true }
  );
};

/********** Get qolresult from config **********/
export const getQolResult = async (payload) => {
  // let matchObj = { QOL_value: payload.QOL_value }

  // const queryObj = QOLMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
  // return await queryObj

  try {
    let QOL_value = payload.QOL_value;
    console.log(QOL_value, "ppppppp");

    const result = await QOLMODEL.find({
      $and: [
        { min_value: { $lte: QOL_value } },
        { max_value: { $gte: QOL_value } },
      ],
    });
    console.log(result);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const deleteQolImage = async (payload) => {
  const { id, image } = payload;
  console.log(payload);
  const data = await QOLMODEL.findByIdAndUpdate(
    id,
    { $pull: { images: image } },
    { new: true }
  );

  console.log(data, "data");
  return data;
};

/********** Delete Qol Video **********/
export const deleteQolVideo = async (payload) => {
  const { id, video, videoID } = payload;
  console.log(payload, "servicepayload");
  const data = await QOLMODEL.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { $pull: { videos: { videoURL: video } } },
    { new: true }
  );
  console.log(data, "data");
  return data;
};
