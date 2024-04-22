/*
 * @file: db-schema.js
 * @description: It Contain db schema for pdeclaration collection.
 * @author: Manas Agrawal
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const declarationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        bedTime: {
            type: String,
            required: true,
        },
        wake_upTime: {
            type: String,
            required: true,
        },
        sleepScore:{
            type: String,
            required: false,
        },
        meal: {
            type: Array,
            required: true,
        },
        physical_condition: {
            type: String,
            required: true,
            enum: ["Good", "Bad"],
        },
        fatigue_existence: {
            type: String,
            required: true,
            enum: ['Yes', 'No'],
        },
        do_meditation: {
            type: String,
            required: true,
            enum: ['Yes', 'No'],
        },
        memo: {
            type: String,
            required: false,
            default: "",
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


// Add an index on the createdAt field
declarationSchema.index({ createdAt: -1 });


export default declarationSchema;
