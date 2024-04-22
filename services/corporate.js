/*
 * @file: corporate.js
 * @description: It Contain function layer for corporate service.
 * @author: Manas Agrawal
 */

import mongoose from "mongoose";
import CORPORATEMODEL from "../collections/corporate";
import USERMODEL from "../collections/user"
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
import corporate from "../collections/corporate";
const { mailchimp_key, mailchimp_audience_id } = config.get('app');

mailchimp.setConfig({
    apiKey: mailchimp_key,
    server: 'us2',
});

const { frontendUrl } = config.get("app");
const formidable = require("formidable");
const form = formidable({ multiples: true });


/********** Save corporate **********/
export const saveCorporate = async (payload) => {
    let saveData = await CORPORATEMODEL.saveUser(payload);
    return {
        name: saveData?.name,
        code: saveData?.code,
    };
};

/********** Get corporate by id **********/
export const getCorporate = async (payload) => {
    let matchObj = { _id: mongoose.Types.ObjectId(payload.id) }
    const queryObj = CORPORATEMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
    return await queryObj
};

/********** Get all corporate **********/
export const getAllCorporate = async (payload) => {
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
        $or: [{ name: { $regex: regex } },
        {code:{$regex: regex}}],
      };
    }
  
    const pipeline = [
      { $match: matchObj },
      {
        $lookup: {
          from: "users", // Assuming the collection name for users is "users"
          let: { corporateCode: "$code" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$corporateCode", "$$corporateCode"] },
                    { $eq: ["$roles", "DRIVER"] },
                  ],
                },
              },
            },
          ],
          as: "users",
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          createdAt: 1,
          userCount: { $size: "$users" },
        },
      },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ];
  
    const countPipeline = [{ $match: matchObj }, { $count: "count" }];
  
    const [data, countResult] = await Promise.all([
      CORPORATEMODEL.aggregate(pipeline),
      CORPORATEMODEL.aggregate(countPipeline),
    ]);
  
    const count = countResult.length > 0 ? countResult[0].count : 0;
  
    console.log(data);
    return {
      data: data,
      total: count,
      count: data.length,
    };
  };
  
  

/********** Update corporate **********/
export const updateCorporate = async (payload) => {
    return await CORPORATEMODEL.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(payload._id)
    },
        payload,
        { new: true }
    );
};

/********** Delete corporate **********/
export const deleteCorporate = async (payload) => {
    return await CORPORATEMODEL.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload.id) },
        { isDeleted: true },
        { fields: { _id: 1 }, new: true }
    );
};