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
        declarationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Declaration",
            required: true,
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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
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
judgementSchema.index({ declarationId: 1 });

export default judgementSchema;
