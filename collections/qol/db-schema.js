/*
 * @file: db-schema.js
 * @description: It Contain db schema for qol collection.
 * @author: Siddhant Singh
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const qolSchema = new mongoose.Schema(
    {
        min_value: {
            type: Number,
            required: false
        },
        max_value: {
            type: Number,
            required: false
        },
        level: {
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
        images: {
            type: Array,
            required: false,
            default: ""
        },
        videos: [{
            videoURL: {
              type: String,
              required: false,
            },
            thumbnailURL: {
              type: String,
              required: false,
            }
          }],
        // videos: {
        //     type: Array,
        //     required: false,
        //     default: ""
        // },
        led: {
            type: Boolean,
            required: false,
            default: false
        },
        vibrations: {
            type: Boolean,
            required: false,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Add an index on the createdAt field
qolSchema.index({ min_value: 1 });
qolSchema.index({ max_value: 1 });
export default qolSchema;
