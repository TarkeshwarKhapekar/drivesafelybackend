/*
 * @file: db-schema.js
 * @description: It Contain db schema for corporate collection.
 * @author: Manas Agrawal
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const corporateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            default: "",
        },
        code: {
            type: String,
            required: false,
            default: "",
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

// Add an index on the createdAt field
corporateSchema.index({ createdAt: -1 });

export default corporateSchema;
