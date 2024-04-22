/*
 * @file: judgement.js
 * @description: It Contain function layer for judgement service.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import CONFIGMODEL from "../collections/judgement"
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


/********** Save config **********/
export const saveJudgement = async (payload) => {
    let saveData = await CONFIGMODEL.saveJudgement(payload);
    return {
        saveData
    };
};

/********** Get config by id **********/
export const getAll = async (payload) => {
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
            $or: [{ title: { $regex: regex } }]
        };
    }

    // Add filter based on the 'type' field
    if (payload.type) {
        matchObj = {
            ...matchObj,
            type: payload.type,
        };
    }
    const queryObj = CONFIGMODEL.find(matchObj);
    let count = await queryObj;
    let data = await queryObj
        .skip(skip)
        .limit(limit)
        .sort(sort);
    return {
        data: data,
        total: count.length
    };
};

/********** Get config by id **********/
export const get = async (payload) => {
    let matchObj = { _id: mongoose.Types.ObjectId(payload.id) }
    const queryObj = CONFIGMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
    return await queryObj
};

/********** Update config **********/
export const update = async (payload, jdgId) => {
    return await CONFIGMODEL.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(payload._id)
    },
        payload,
        { new: true }
    );
};

/********** Delete Content **********/
export const del = async (payload) => {
    return await CONFIGMODEL.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload.id) },
        { isDeleted: true },
        { fields: { _id: 1 }, new: true }
    );
};


/********** Get configresult from config **********/
export const getJudgementResult = async (payload) => {
    // let matchObj = { Config_value: payload.Config_value }

    // const queryObj = CONFIGMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
    // return await queryObj


    try {
        let Config_value = payload.Config_value;
        console.log(Config_value, "ppppppp")

        const result = await CONFIGMODEL.find({
            $and: [
                { min_value: { $lte: Config_value } },
                { max_value: { $gte: Config_value } }
            ]
        });
        console.log(result)

        return result;
    } catch (error) {
        throw error;
    }
};
