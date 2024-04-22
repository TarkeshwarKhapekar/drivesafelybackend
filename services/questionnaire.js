/*
 * @file: questionnaire.js
 * @description: It Contain function layer for questionnaire service.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import QUESTIONMODEL from "../collections/questionnaire";
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


/********** Save question **********/
export const saveQuestion = async (payload) => {
    let saveData = await QUESTIONMODEL.saveQuestion(payload);
    return saveData;
};

/********** Get question by id **********/
export const getQuestion = async (payload) => {
    let matchObj = { _id: mongoose.Types.ObjectId(payload.id) }
    const queryObj = QUESTIONMODEL.findone(matchObj);
    return await queryObj
};

/********** Get all question **********/
export const getAllQuestions = async (payload) => {
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
            $or: [{ message: { $regex: regex } }]
        };
    }
    const queryObj = QUESTIONMODEL.find(matchObj);
    let count = await queryObj;
    let data = await queryObj
        .skip(skip)
        .limit(limit)
        .sort(sort);

    return {
        questionnaire: data,
        total: count.length
    };
};



export const getAllQuestionsBycount = async (payload) => {
    let sort = { [payload.sortBy ? payload.sortBy : "createdAt"]: -1 };
    // let limit = payload.count ? JSON.parse(payload.count) : 20;
    // payload.page = payload.page ? payload.page : 1
    // let skip = JSON.parse((payload.page - 1) * limit);


    let matchObj = {
        isDeleted: false,
    }
 
    let cnt =Number(payload.id);
    /****************Condition to check Search Parameters****************/ 
    // if (payload.search) {
    //     payload.search = payload.search.toLowerCase();
    //     const regex = new RegExp(`${payload["search"]}`, "i");
    //     matchObj = {
    //         ...matchObj,
    //         $or: [{ message: { $regex: regex } }]
    //     };
    // }
    // aggregate([{$sample:{size:2}}]).pretty();
    console.log("cnt")
    console.log(cnt)
    const queryObj = QUESTIONMODEL.aggregate([
        {$match:matchObj},
        {$sample:{size:cnt}}]
        );
    let count = await queryObj;
    let data = await queryObj
        // .skip(skip)
        // .limit(limit)
        .sort(sort);

    return {
        questionnaire: data,
        total: count.length
    };
};


/********** Delete Notification **********/
export const deleteQuestion = async (payload) => {
    return await QUESTIONMODEL.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload.id) },
        { isDeleted: true },
        { fields: { _id: 1 }, new: true }
    );
};

/********** Update Notification **********/
export const updateQuestion = async (payload) => {
    return await QUESTIONMODEL.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(payload._id)
    },
        payload,
        { new: true }
    );
};


export const getAllQuestionsCount = async (payload) => {
    console.log("payload");
    console.log(payload);
    return {total: await QUESTIONMODEL.findByCondition(payload).countDocuments()};  
};