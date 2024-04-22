/*
 * @file: db-schema.js
 * @description: It Contain db schema for judgement collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const judgementSchema = new mongoose.Schema(
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
        colorCode: {
            type: String
        },
        // images: {
        //     type: Array,
        //     required: false,
        //     default: ""
        // },
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
judgementSchema.index({ createdAt: -1 });

export default judgementSchema;
