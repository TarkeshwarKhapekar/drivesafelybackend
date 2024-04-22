/*
 * @file: db-schema.js
 * @description: It Contain db schema for reflex collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reflexSchema = new mongoose.Schema(
    {
        reflexscreen1: {
            type: String,
            required: false,
        },
        reflexscreen2: {
            type: String,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

reflexSchema.index({ createdAt: 1 });


export default reflexSchema;
