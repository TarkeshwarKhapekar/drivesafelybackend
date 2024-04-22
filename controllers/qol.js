/*
 * @file: qol.js
 * @description: It Contain function layer for qol controller.
 * @author: Siddhant Singh
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/qol";
import Message from "../utilities/messages";


/**************** Add Qol ***********/
export const addQol = async (req, res, next) => {
    console.log(req)
    let payload = req?.body;
    console.log(payload)

        // Check if the image file was uploaded
        let image = [];
        if (req?.files?.images) {
            // Check if there is only one file or multiple files
            if (Array.isArray(req.files.images)) {
                image = req.files.images.map((file) => file.filename);
            } else {
                image.push(req.files.images[0].filename);
            }
        }
    
        // Check if the video file was uploaded
        console.log("vidoes",JSON.stringify(req.files.videos));
        console.log("thmbnails",JSON.stringify(req.thumbnails));
       
        let video = [];
        if (req?.files?.videos) {
            // Check if there is only one file or multiple files
            if (Array.isArray(req.files.videos)) {
                // video = req.files.videos.map((file) => file.filename);

                req.files.videos.forEach(element => {
                    video.push({
                        videoURL:element.filename,
                        thumbnailURL:element.thumbnail
                    });
                }); 
            } else {
                video.push(req.files.videos[0].filename);
            }
        }

        const {led, vibrations, level, levelJa, description, descriptionJa, ...rest } = payload;

    try {
        const result = await SERVICE.saveQol({ 
            led : led,
            vibrations: vibrations,
            level: { en: level, ja: levelJa }, 
            description: { en: description, ja: descriptionJa }, 
            images: image,
            videos: video,
            ...rest       
        });
        res.status(200).json(successAction(result, Message.qolAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get All Qol  ***********/
export const getAllQol = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllQol(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Get Qol by id ***********/
export const getQol = async (req, res, next) => {
    const payload = req.params;
    console.log(payload,"payload")
    try {
        const result = await SERVICE.getQol(payload);
        console.log(result,"result")
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get Qol by id ***********/
export const getQolList = async (req, res, next) => {
    const payload = req?.body
    console.log(payload)
    try {
        const result = await SERVICE.getQolInRange(payload);

        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Update Qol ***********/
export const updateQol = async (req, res, next) => {
    const payload = req?.body
console.log(payload)
    // Check if the image file was uploaded
    let images = [];
    if (req?.files?.images) {
        // Check if there is only one file or multiple files
        if (Array.isArray(req.files.images)) {
            images = req.files.images.map((file) => file.filename);
        } else {
            images.push(req.files.images[0].filename);
        }
    }

    // Check if the video file was uploaded
    let videos = [];
    if (req?.files?.videos) {
        // Check if there is only one file or multiple files
        if (Array.isArray(req.files.videos)) {
            // videos = req.files.videos.map((file) => file.filename);

            req.files.videos.forEach(element => {
                videos.push({
                    videoURL:element.filename,
                    thumbnailURL:element.thumbnail
                });
            }); 



        } else {
            videos.push(req.files.videos[0].filename);
        }
    }
    try {
        const existingData = await SERVICE.getQol(payload); // Get existing data from database

        // Convert existing images and videos to arrays if they are not already arrays
        const existingImages = Array.isArray(existingData.images) ? existingData[0].images : existingData[0].images;
        const existingVideos = Array.isArray(existingData.videos) ? existingData[0].videos : existingData[0].videos;

        // Combine the existing and new data
        const updatedImages = [...existingImages, ...images];
        const updatedVideos = [...existingVideos, ...videos];
        const { level, levelJa, description, descriptionJa, ...rest } = payload;

        const data = await SERVICE.updateQol({
            ...rest,
            level: { en: level, ja: levelJa },
            description: { en: description, ja: descriptionJa },
            images: updatedImages,
            videos: updatedVideos       
        });
        if (data) {
            res.json(successAction(data, Message.qolUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete Content ***********/
export const deleteQol = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteQol(req.params);
        if (data) {
            res.json(successAction(data, Message.qolRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

// export const deleteQolImage = async (req, res, next) => {
//     try {
//         const qolId = req.params.qolId; // Assuming the QoL ID is passed as a URL parameter
//         const imageIndex = req.params.imageIndex; // Assuming the image index is passed as a URL parameter

//         // Call the service method to delete the image
//         const result = await SERVICE.deleteQolImage(qolId, imageIndex);

//         if (result) {
//             res.status(200).json(successAction(null, "Image deleted successfully."));
//         } else {
//             res.status(404).json(failAction("Image not found."));
//         }
//     } catch (error) {
//         res.status(400).json(failAction(error.message));
//     }
// };

// get qol result from config
export const getQolResult = async (req, res, next) => {
    console.log("Inside QOL Result Controller", req.body);
    const payload = req.body;
    try {
        const result = await SERVICE.getQolResult(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

export const deleteQolImage = async(req,res,next) => {
    const payload = req?.body
    console.log(payload)
    try{
        const data = await SERVICE.deleteQolImage(payload);
        if (data) {
            res.json(successAction(data, Message.qolRemoved));
        } else {
            res.json(successAction([]));
        }
    }catch(error){
        res.json(failAction(error.message));

    }
}

/**************** Delete Qol Video ***********/
export const deleteQolVideo = async (req, res, next) => {
    const payload = req?.body;
    console.log(payload,"payload")
    try {
        const data = await SERVICE.deleteQolVideo(payload);
        if (data) {
            res.json(successAction(data, Message.qolRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};