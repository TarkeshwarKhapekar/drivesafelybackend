/*
 * @file: db-schema.js
 * @description: It Contain db schema for weightageScore collection.
 * @author: Siddhant Singh
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const weightageScoreSchema = new mongoose.Schema(
    {
        sleepScore: {
            type: Number,
            required: false,
            default: 0,
        },
        exerciseScore: {
            type: Number,
            required: false,
            default: 0,
        },
        stressScore: {
            type: Number,
            required: false,
            default: 0,
        },
        reflexScore: {
            type: Number,
            required: false,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export default weightageScoreSchema;
