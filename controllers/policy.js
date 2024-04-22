/*
 * @file: policy.js
 * @description: It Contain function layer for policy controller.
 * @author: Siddhant Singh
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/policy";
import Message from "../utilities/messages";


/**************** Add Qol ***********/
export const addPolicy = async (req, res, next) => {
    let payload = req.body;
    console.log(req.body,"payload")
    try {
        const { title, titleJa, description, descriptionJa, rest } = payload;

        const result = await SERVICE.savePolicy({ 
            title: { en: title, ja: titleJa }, 
            description: { en: description, ja: descriptionJa },      
        });
        res.status(200).json(successAction(result, Message.policyAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};


/**************** Get All policy  ***********/
export const getAllPolicy = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllPolicy();
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update Policy ***********/
export const updatePolicy = async (req, res, next) => {
    const payload = req?.body
    try {
        const { _id, title, titleJa, description, descriptionJa } = payload;
        const data = await SERVICE.updatePolicy({
            _id,
            title: { en: title, ja: titleJa },
            description: { en: description, ja: descriptionJa },
        });
        if (data) {
            res.json(successAction(data, Message.policyUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};