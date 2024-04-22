/*
 * @file: db-schema.js
 * @description: It Contain db schema for pdeclaration collection.
 * @author: Manas Agrawal
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reflectionSchema = new mongoose.Schema(
    {
        declarationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Declaration",
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        reflexScore: {
            type: Number,
            required: false,
        },
       
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Add an index on the createdAt field
reflectionSchema.index({ createdAt: -1 });
reflectionSchema.index({ declarationId:1});


export default reflectionSchema;
