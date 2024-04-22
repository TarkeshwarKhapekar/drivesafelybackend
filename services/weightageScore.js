/*
 * @file: content.js
 * @description: It Contain function layer for content service.
 * @author: Manas Agrawal
 */

import mongoose from "mongoose";
import CONTENTMODEL from "../collections/content";
import WEIGHTAGESCOREMODEL from "../collections/weightageScore"


/********** Save Weightage Score **********/
export const weightageScore = async (payload) => {
    let saveweightageScore = await WEIGHTAGESCOREMODEL.saveScore(payload);
    return {
        saveweightageScore
    };
};


/********** Get weightage score **********/
export const getWeightageScore = async (payload) => {
    const queryObj = WEIGHTAGESCOREMODEL.find();
    return await queryObj
};

/********** Update Weightage Score **********/
export const updateWeightageScore = async (payload) => {
    console.log(payload)
    return await WEIGHTAGESCOREMODEL.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(payload._id)
    },
        payload,
        { new: true }
    );
};