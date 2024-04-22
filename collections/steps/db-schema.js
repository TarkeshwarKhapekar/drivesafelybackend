/*
 * @file: db-schema.js
 * @description: It Contain db schema for steps collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const stepsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        steps: {
            type: Number,
            required: true,
            default: null,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Add an index on the createdAt field
stepsSchema.index({ createdAt: 1 });


export default stepsSchema;
