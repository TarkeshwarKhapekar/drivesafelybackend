/*
 * @file: qol.js
 * @description: It Contain function layer for qol controller.
 * @author: Pankaj Chaudhari
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/judgement";
import Message from "../utilities/messages";


/**************** Add Config ***********/
export const add = async (req, res, next) => {
  let payload = req?.body;
  console.log(payload, "payload");
  const { level, levelJa, title, titleJa, description, descriptionJa, ...rest } = payload;
  try {
    const result = await SERVICE.saveJudgement(
        {
        level: { en: level, ja: levelJa },
        title: { en: title, ja: titleJa },
        description: { en: description, ja: descriptionJa },
        ...rest
    });
    res.status(200).json(successAction(result, Message.qolAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get All Judgement  ***********/
export const getAll = async (req, res, next) => {
  try {
    const data = await SERVICE.getAll(req.query);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};

/**************** Get Judgement by id ***********/
export const get = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.get(payload);
    res.status(200).json(successAction(result, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get Judgement by id ***********/
export const getList = async (req, res, next) => {
  const payload = req?.body;

  try {
    const result = await SERVICE.getQolInRange(payload);

    res.status(200).json(successAction(result, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Update Judgement ***********/
export const update = async (req, res, next) => {
  const payload = req?.body;
  console.log(payload, "payload");
  try {
    const {
      level,
      levelJa,
      description,
      descriptionJa,
      title,
      titleJa,
      ...rest
    } = payload;

    const data = await SERVICE.update({
      ...rest,
      level: { en: level, ja: levelJa },
      description: { en: description, ja: descriptionJa },
      title: { en: title, ja: titleJa },

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
export const del = async (req, res, next) => {
  try {
    const data = await SERVICE.del(req.params);
    if (data) {
      res.json(successAction(data, Message.qolRemoved));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};


// get qol result from config
export const getJudgementResult = async (req, res, next) => {
  console.log("Inside QOL Result Controller", req.body);
  const payload = req.body;
  try {
    const result = await SERVICE.getJudgementResult(payload);
    res.status(200).json(successAction(result, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
