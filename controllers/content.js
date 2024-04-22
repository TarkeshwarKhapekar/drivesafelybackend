/*
 * @file: content.js
 * @description: It Contain function layer for content controller.
 * @author: Manas Agrawal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/content";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";


/**************** Add Content ***********/
export const addContent = async (req, res, next) => {
    let payload = req?.body;

    console.log("payload", JSON.stringify(payload));

    
    // Check if the image file was uploaded
    let image = [];
    if (req?.files?.images) {
        // Check if there is only one file or multiple files
        console.log("req",req.files.images);
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
    // videos: [{
    //     videoURL: {
    //       type: String,
    //       required: false,
    //     },
    //     thumbnailURL: {
    //       type: Array,
    //       required: false,
    //       default: []
    //     }
    //   }],
    if (req?.files?.videos) {
        // Check if there is only one file or multiple files
        if (Array.isArray(req.files.videos)) {
            // video = req.files.videos.map((file) =>  file.filename);

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

    const { title, titleJa, description, descriptionJa, ...rest } = payload;

    try {
        const result = await SERVICE.saveContent({ 
            title: { en: title, ja: titleJa },
            description: { en: description, ja: descriptionJa }, 
            images: image,
            videos: video,
            ...rest
         });
        res.status(200).json(successAction(result, Message.contentAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get Content by id ***********/
export const getContent = async (req, res, next) => {
    const payload = req.params;
    try {
        const result = await SERVICE.getContent(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};


export const getContentByType = async (req, res, next) => {
    const payload = req.params;
    console.log("inside ctr"+ payload)
    try {
        const result = await SERVICE.getContentByType(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};
/**************** Get all Content ***********/
export const getAllContent = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllContent(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};



export const getAllContentTopcontents = async (req, res, next) => {
    try {
        console.log("Controller for content");
        const data = await SERVICE.getAllContentTopcontents(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update Content ***********/
export const updateContent = async (req, res, next) => {
    const payload = req?.body
    console.log(payload,"payload")
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
    let video = [];
    // videos: [{
    //     videoURL: {
    //       type: String,
    //       required: false,
    //     },
    //     thumbnailURL: {
    //       type: Array,
    //       required: false,
    //       default: []
    //     }
    //   }],
    if (req?.files?.videos) {
        // Check if there is only one file or multiple files
        if (Array.isArray(req.files.videos)) {
            // video = req.files.videos.map((file) =>  file.filename);

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
    // let videos = [];
    // if (req?.files?.videos) {
    //     // Check if there is only one file or multiple files
    //     if (Array.isArray(req.files.videos)) {
    //         videos = req.files.videos.map((file) => file.filename);
    //     } else {
    //         videos.push(req.files.videos[0].filename);
    //     }
    // }
    try {
        // const existingData = await SERVICE.getContent(payload); // Get existing data from database

        // Convert existing images and videos to arrays if they are not already arrays
        //    const existingImages = Array.isArray(existingData.images) ? existingData[0].images : existingData[0].images;
        // const existingVideos = Array.isArray(existingData.videos) ? existingData[0].videos : existingData[0].videos;

        // Combine the existing and new data
        // const updatedImages = [...existingImages, ...images];
        // const updatedVideos = [...existingVideos, ...videos];

        const { title, titleJa, description, descriptionJa, ...rest } = payload;


       let postDT=  { 
            ...rest,
            title: { en: title, ja: titleJa },
            description: { en: description, ja: descriptionJa },
            // images: images, //updatedImages,
            // videos: video //updatedVideos
          
         };
      //   $push: { videos: { $each: video } }
       

        
        if (video.length > 0 && images.length > 0) {
            console.log("both are present")
            postDT["$push"] = { videos: { $each: video }, images: { $each: images } }
        } else {
            console.log("vidoe =", video.length)
            if (video.length > 0) {
                postDT["$push"] = { videos: { $each: video } }
            }
            console.log("image =", images.length)
            if (images.length > 0) {
                postDT["$push"] = { images: { $each: images } }
            }
        }


         const data = await SERVICE.updateContent(postDT);
         console.log(data)
        if (data) {
            res.json(successAction(data, Message.contentUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete Content ***********/
export const deleteContent = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteContent(req.params);
        if (data) {
            res.json(successAction(data, Message.contentRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};


/**************** Delete Content Image ***********/
export const deleteContentImage = async (req, res, next) => {
    const payload = req?.body;
    console.log(payload,"payload")
    try {
        const data = await SERVICE.deleteContentImage(payload);
        if (data) {
            res.json(successAction(data, Message.contentRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete Content Video ***********/
export const deleteContentVideo = async (req, res, next) => {
    const payload = req?.body;
    console.log(payload,"payload")
    try {
        const data = await SERVICE.deleteContentVideo(payload);
        console.log(data,"data controlserer")
        if (data) {
            res.json(successAction(data, Message.contentRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};