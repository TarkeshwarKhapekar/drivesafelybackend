/*
 * @file: content.js
 * @description: It Contain function layer for content service.
 * @author: Manas Agrawal
 */

import mongoose from "mongoose";
import CONTENTMODEL from "../collections/content";
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

/********** Save content **********/
export const saveContent = async (payload) => {
  let saveData = await CONTENTMODEL.saveUser(payload);
  return {
    saveData,
  };
};

/********** Get content by id **********/
export const getContent = async (payload) => {
  let matchObj = { _id: mongoose.Types.ObjectId(payload.id) };
  const queryObj = CONTENTMODEL.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0,
  });
  return await queryObj;
};

export const getContentByType = async (payload) => {
  let matchObj = { type: payload.type, isDeleted: false };
  console.log("inside server");
  console.log(matchObj);
  const queryObj = CONTENTMODEL.find(matchObj);
  return await queryObj;
};

/********** Get all Content **********/
export const getAllContent = async (payload) => {
  let sort = { [payload.sortBy ? payload.sortBy : "createdAt"]: -1 };
  let limit = payload.count ? JSON.parse(payload.count) : 20;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);

  let matchObj;
  if (payload.show == "alltypes") {
    matchObj = {
      isDeleted: false,
    };
  } else {
    matchObj = {
      $or: [{ type: "Articles & Blogs" }, { type: "Other" }],
      isDeleted: false,
    };
  }

  /****************Condition to check Search Parameters****************/
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{ title: { $regex: regex } }],
    };
  }

  // Add filter based on the 'type' field
  if (payload.type) {
    matchObj = {
      ...matchObj,
      type: payload.type,
    };
  }
  const queryObj = CONTENTMODEL.find(matchObj);
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length,
  };
};

export const getAllContentTopcontents = async (payload) => {
  console.log("service in get conntetnt");

  let matchObj = {
    $or: [{ type: "Advertisement" }, { type: "Traffic Safety Information" }],
    isDeleted: false,
  };

  /****************Condition to check Search Parameters****************/
  // if (payload.search) {
  //     payload.search = payload.search.toLowerCase();
  //     const regex = new RegExp(`${payload["search"]}`, "i");
  //     matchObj = {
  //         ...matchObj,
  //         $or: [{ title: { $regex: regex } }]
  //     };
  // }

  // // Add filter based on the 'type' field
  // if (payload.type) {
  //     matchObj = {
  //         ...matchObj,
  //         type: payload.type,
  //     };
  // }

  const queryObj = CONTENTMODEL.findByCondition(matchObj);
  // let count = await queryObj;
  let data = await queryObj;
  //     .skip(skip)
  //     .limit(limit)
  //     .sort(sort);
  return {
    data: data,
    // total: count.length
  };
};
/********** Update Content **********/
export const updateContent = async (payload) => {
  return await CONTENTMODEL.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(payload.id),
    },
    payload,
    { new: true }
  );
};

/********** Delete Content **********/
export const deleteContent = async (payload) => {
  return await CONTENTMODEL.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(payload.id) },
    { isDeleted: true },
    { fields: { _id: 1 }, new: true }
  );
};

/********** Delete Content Image**********/
export const deleteContentImage = async (payload) => {
  const { id, image } = payload;
  console.log(payload, "servicepayload");
  const data = await CONTENTMODEL.findByIdAndUpdate(
    id,
    { $pull: { images: image } },
    { new: true }
  );
  return data;
};

/********** Delete Content Video **********/
export const deleteContentVideo = async (payload) => {
  const { id, video, videoID } = payload;
  console.log(payload, "servicepayload");
  const data = await CONTENTMODEL.findByIdAndUpdate(
    { _id: id },
    { $pull: { videos: { _id: videoID } } },
    { new: true }
  );
  console.log(data, "data");
  return  data;
    // const { id, video,videoID } = payload;
    // console.log(payload,"servicepayload");
    // // const data = await CONTENTMODEL.find({_id:id})
    // const data = await CONTENTMODEL.findByIdAndUpdate(
    //   { _id: mongoose.Types.ObjectId(id) },
    //   { $pull: { videos: { videoURL: video } } },
    //   { new: true }
    // );

    // db.collection.updateOne(
    //     { _id: ObjectId("64be6d0563afe6b410cfd532") },
    //     { $pull: { videos: { _id: ObjectId("64be6e8163afe6b410cfd546") } } }
    //  )
    // console.log(data,"data")
    // console.log(data[0].videos,"data")
    // return data;
};
  

