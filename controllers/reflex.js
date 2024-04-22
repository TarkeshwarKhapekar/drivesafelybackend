/*
 * @file: reflex.js
 * @description: It Contain function layer for reflex controller.
 * @author: Manas Agrawal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/reflex";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add Reflex Screen ***********/
export const addReflex = async (req, res, next) => {
  const payload = req.body;
  console.log(payload);

  let image1 = "";
  let image2 = "";

  if (req?.files?.reflexscreen1) {
    image1 = req.files.reflexscreen1[0].filename;
  } else {
    res.status(400).json(failAction("Please upload reflexscreen1."));
    return;
  }

  if (req?.files?.reflexscreen2) {
    image2 = req.files.reflexscreen2[0].filename;
  } else {
    res.status(400).json(failAction("Please upload reflexscreen2."));
    return;
  }

  try {
    const result = await SERVICE.saveReflexScreen({
      reflexscreen1: image1,
      reflexscreen2: image2,
    });

    res.status(200).json(successAction(result, Message.reflexadd));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get Reflex Screen ***********/
export const getReflexScreen = async (req, res, next) => {
  try {
    const result = await SERVICE.getReflexScreen();
    res.status(200).json(successAction(result, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/********** Update Reflex **********/
export const updateReflex = async (req, res, next) => {
  const payload = req?.body;

  let image1 = "";
  let image2 = "";

  if (req?.files?.reflexscreen1) {
    image1 = req.files.reflexscreen1[0].filename;
  }

  if (req?.files?.reflexscreen2) {
    image2 = req.files.reflexscreen2[0].filename;
  }

  const updateData = { ...payload };

  if (image1) {
    updateData.reflexscreen1 = image1;
  }

  if (image2) {
    updateData.reflexscreen2 = image2;
  }

  try {
    const data = await SERVICE.updateReflex(updateData);
    console.log(data,"data");

    if (data) {
      res.json(successAction(data, Message.reflexUpdated));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};


export const deleteReflexImage = async (req, res, next) => {
  const payload = req?.body;
  try {
    const data = await SERVICE.deleteReflexImage(payload);
    if (data) {
      res.json(successAction(data, Message.reflexRemoved));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};
