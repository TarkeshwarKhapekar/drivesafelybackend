/*
 * @file: notification.js
 * @description: It Contain function layer for notification service.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import NOTIFICATIONMODEL from "../collections/notification";
import Message from "../utilities/messages";
var { sendNotification, webNotification } = require('../services/fcmService')

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
export const saveNotification = async (payload) => {
    let saveData = await NOTIFICATIONMODEL.saveUser(payload);

   // Send notification using fcm firebase notification
   // let notify = await sendNotification(receiver,message,type,sendData,title );
    console.log(saveData)
    return {
        saveData
    };
};

/********** Get notification by id **********/
export const getNotification = async (payload) => {
    let matchObj = { _id: mongoose.Types.ObjectId(payload.id) }
    const queryObj = NOTIFICATIONMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, password: 0 });
    return await queryObj
};

/********** Get all notification **********/
export const getAllNotification = async (payload) => {
    let sort = { [payload.sortBy ? payload.sortBy : "createdAt"]: -1 };
    let limit = payload.count ? JSON.parse(payload.count) : 20;
    payload.page = payload.page ? payload.page : 1
    let skip = JSON.parse((payload.page - 1) * limit);

    let matchObj = {
        isDeleted: false,
    }

    /****************Condition to check Search Parameters****************/
    if (payload.search) {
        payload.search = payload.search.toLowerCase();
        const regex = new RegExp(`${payload["search"]}`, "i");
        matchObj = {
            ...matchObj,
            $or: [{ type: { $regex: regex } }]
        };
    }
    const queryObj = NOTIFICATIONMODEL.find(matchObj, { type: 1, title: 1,image:1, message: 1, createdAt: 1 });
    let count = await queryObj;
    let data = await queryObj
        .skip(skip)
        .limit(limit)
        .sort(sort);

    return {
        notifications: data,
        total: count.length
    };
};

/********** Delete Notification **********/
export const deleteNotification = async (payload) => {
    return await NOTIFICATIONMODEL.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload.id) },
        { isDeleted: true },
        { fields: { _id: 1 }, new: true }
    );
};

/********** Update Notification **********/
export const updateNotification = async (payload) => {
    console.log(payload)
    return await NOTIFICATIONMODEL.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(payload.id)
    },
        payload,
        { new: true }
    );
};


export const deleteImage = async (payload) => {
    const { id, image } = payload;
    console.log(payload);
    const data = await NOTIFICATIONMODEL.findByIdAndUpdate(
      id,
      { $pull: { image: image } },
      { new: true }
    );
    
    console.log(data,"data");
    return data;
};
  