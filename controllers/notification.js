/*
 * @file: notification.js
 * @description: It Contain function layer for notification controller.
 * @author: Manas Agrawal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/notification";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add Notification ***********/
export const addNotification = async (req, res, next) => {
    const payload = req.body;
    console.log(payload);

    // Check if the image file was uploaded
    let images = [];
    if (req?.files?.image) {
        // Check if there is only one file or multiple files
        if (Array.isArray(req.files.image)) {
            images = req.files.image.map((file) => file.filename);
        } else {
            images.push(req.files.image[0].filename);
        }
    }

    const { title, titleJa, message, messageJa, ...rest } = payload;

    try {
        const result = await SERVICE.saveNotification({
            title: { en: title, ja: titleJa },
            message: { en: message, ja: messageJa },
            image: images,
            ...rest
          });
        res.status(200).json(successAction(result, Message.notificationAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};


/**************** Get notification by id ***********/
export const getNotification = async (req, res, next) => {
    const payload = req.params;
    try {
        const result = await SERVICE.getNotification(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get all notification ***********/
export const getAllNotification = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllNotification(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete notification ***********/
export const deleteNotification = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteNotification(req.params);
        if (data) {
            res.json(successAction(data, Message.notificationRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update notification ***********/
export const updateNotification = async (req, res, next) => {
    const payload = req?.body;
  
    // Check if the image file was uploaded
    let images = [];
    if (req?.files?.image) {
      // Check if there is only one file or multiple files
      if (Array.isArray(req.files.image)) {
        images = req.files.image.map((file) => file.filename);
      } else {
        images.push(req.files.image[0].filename);
      }
    }
  
    try {
      const existingData = await SERVICE.getNotification(payload); // Get existing data from database
  
      // Convert existing images to an array if it's not already an array
      const existingImage = Array.isArray(existingData.image) ? existingData[0].image : existingData[0].image;
  
      // Combine the existing and new images
      const updatedImage = [...existingImage, ...images];
  
      const { title, titleJa, message, messageJa, ...rest } = payload;
  
      const updatedData = await SERVICE.updateNotification({
        ...rest,
        title: { en: title, ja: titleJa },
        message: { en: message, ja: messageJa },
        image: updatedImage
      });
  
      if (updatedData) {
        res.json(successAction(updatedData, Message.notificationUpdated));
      } else {
        res.json(successAction([]));
      }
    } catch (error) {
      res.json(failAction(error.message));
    }
  };
  

export const deleteImage = async(req,res,next) => {
    const payload = req?.body
    console.log(payload)
    try{
        const data = await SERVICE.deleteImage(payload);
        if (data) {
            res.json(successAction(data, Message.notificationRemoved));
        } else {
            res.json(successAction([]));
        }
    }catch(error){
        res.json(failAction(error.message));

    }
}
 