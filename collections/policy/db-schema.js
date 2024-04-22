/*
 * @file: db-schema.js
 * @description: It Contain db schema for policy collection.
 * @author: Siddhant Singh
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const policySchema = new mongoose.Schema(
    {
        title: {
            en: {
                type: String,
                required: false,
                default: null,
            },
            ja: {
                type: String,
                required: false,
                default: null,
            }
        },
        description: {
            en: {
                type: String,
                required: false,
                default: null,
            },
            ja: {
                type: String,
                required: false,
                default: null,
            }
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Add an index on the createdAt field
policySchema.index({ createdAt: -1 });

export default policySchema;
