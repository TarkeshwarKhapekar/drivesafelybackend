/*
 * @file: db-schema.js
 * @description: It Contain db schema for content collection.
 * @author: Manas Agrawal
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const contentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
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
        url: {
            type: String,
            required: false,
        },
        frequency: {
            type: String,
            required: true,
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
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Add an index on the createdAt field
contentSchema.index({ createdAt: -1 });
export default contentSchema;
