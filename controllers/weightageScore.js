/*
 * @file: weightageScore.js
 * @description: It Contain function layer for weightageScore controller.
 * @author: Siddhant Singh
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/weightageScore";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";


/**************** Add Weightage Score ***********/
export const addWeightageScore = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.weightageScore(payload);
        res.status(200).json(successAction(result, Message.score));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
}

/**************** Get Weightage Score ***********/
export const getWeightageScore = async (req, res, next) => {
    try {
        const result = await SERVICE.getWeightageScore();
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Update Weightage Score ***********/
export const updateWeightageScore = async (req, res, next) => {
    const payload = req?.body
    try {
        const data = await SERVICE.updateWeightageScore(payload);
        console.log(data,"ooo")
        if (data) {
            res.json(successAction(data, Message.scoreUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};