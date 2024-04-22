/*
 * @file: db-schema.js
 * @description: It Contain db schema for questionnaire collection.
 * @author: Pankaj Chaudhari
 */
import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const notificationSchema = new mongoose.Schema(
    {
       
        // questionName:{
        //     type: String,
        //     required: false,
        //     default: "",
        // }, 

        questionName:{
            en:{
                type: String,
                required: false,
                default: "",
            },
            ja:{
                    type: String,
                    required: false,
                    default: "",
            }
        }, 



        ansType: {
            type: String,
            required: false,
            default: "",
        },
        
        options: [
            {
                name:{
                    en:{
                        type: String,
                        required: false,
                        default: "",
                    },
                    ja:{
                        type: String,
                        required: false,
                        default: "",
                    }
                }, 
                scoreVal:{
                    type: Number,
                    required: false,
                    default: "",
                }, 
                // colorCode:{
                //     type: String,
                //     required: false,
                //     default: "",
                // },                  
            }
        ],   
        // questionnaireSetObj:{
        //     type:array,
        //     required: false,
        //     options: [
        //         {
        //             name:{
        //                 type: String,
        //                 required: false,
        //                 default: "",
        //             }, 
        //             scoreVal:{
        //                 type: Number,
        //                 required: false,
        //                 default: "",
        //             }, 
        //             colorCode:{
        //                 type: String,
        //                 required: false,
        //                 default: "",
        //             },                  
        //         }
        //     ]            
        // },
      
        isDeleted: {
            type: Boolean,
            default: false
        },
        // type: {
        //   type: String,
        //   default: ""
        // },
    },
    { timestamps: true }
);

export default notificationSchema;
