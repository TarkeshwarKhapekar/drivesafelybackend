/*
 * @file: db-schema.js
 * @description: It Contain db schema for questionnaireFeedback collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const questionnaireFSchema = new mongoose.Schema(
    {
        declarationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Declaration",
            required: true,
        },
        count:{
            type: Number,
            required: false,
            default: 0,
        }, 
        totalScore:{
            type: Number,
            required: false,
            default: 0,
        }, 

        response: [
            {
        questionName:{
            type: String,
            required: false,
            default: "",
        }, 
        ansType: {
            type: String,
            required: false,
            default: "",
        },
        options: [
            {
                name:{
                    type: String,
                    required: false,
                    default: "",
                }, 
                scoreVal:{
                    type: Number,
                    required: false,
                    default: "",
                }, 
                selected:{
                    type: Boolean,
                    required: false,
                    default: false,
                },                  
            }
        ]}
       ],
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export default questionnaireFSchema;
