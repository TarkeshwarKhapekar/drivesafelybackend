/*
 * @file: policy.js
 * @description: It Contain function layer for policy service.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import POLICYMODEL from "../collections/policy"
import Message from "../utilities/messages";
import * as COMMON from "./common";
import * as Mail from "../utilities/mail";
import config from "config";
import mailchimp from '@mailchimp/mailchimp_marketing';
const { mailchimp_key, mailchimp_audience_id } = config.get('app');

mailchimp.setConfig({
    apiKey: mailchimp_key,
    server: 'us2',
});



/********** Save Policy **********/
export const savePolicy = async (payload) => {
    console.log(payload,"pauload")
    let saveData = await POLICYMODEL.savePolicy(payload);
    return {
        saveData
    };
};


/********** Get policy  **********/
export const getAllPolicy = async () => {
    const queryObj = POLICYMODEL.find();
    let count = await queryObj;
    return count;
};

/********** Update Policy **********/
export const updatePolicy = async (payload) => {
    const update = await POLICYMODEL.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(payload._id)
    },
        payload,
        { new: true }
    );
console.log(update)
    return update
};