/*
 * @file: questionnnaire.js
 * @description: It Contain function layer for questionnaire controller.
 * @author: Pankaj Chaudhari
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/questionnaire";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add Notification ***********/
export const addQuestion = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveQuestion(payload);
        res.status(200).json(successAction(result, Message.questionAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get notification by id ***********/
export const getQuestion = async (req, res, next) => {
    const payload = req.params;
    console.log(payload)
    try {
        const result = await SERVICE.getQuestion(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get all questions ***********/
export const getAllQuestions = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllQuestions(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};


/**************** Get all questions by count ***********/
export const getAllQuestionsBycount = async (req, res, next) => {
    const payload = req.params;
    console.log(payload)
    try {
        const data = await SERVICE.getAllQuestionsBycount(payload);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};




// /**************** Delete notification ***********/
export const deleteQuestion = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteQuestion(req.params);
        if (data) {
            res.json(successAction(data, Message.questionRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update question ***********/
export const updateQuestion = async (req, res, next) => {
    try {
        const data = await SERVICE.updateQuestion(req.body);
        if (data) {
            res.json(successAction(data, Message.questionUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};



export const getAllQuestionsCount = async(req, res, next) => {
    try {
        const data = await SERVICE.getAllQuestionsCount({});
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }

};