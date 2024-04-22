/*
 * @file: db-schema.js
 * @description: It Contain db schema for notification collection.
 * @author: Manas Agrawal
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const notificationSchema = new mongoose.Schema(
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
        message: {
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
        image: {
            type: Array,
            required: false,
            default: ""
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        type: {
          type: String,
          default: ""
        },
    },
    { timestamps: true }
);

// Add an index on the createdAt field
notificationSchema.index({ createdAt: -1 });

export default notificationSchema;
