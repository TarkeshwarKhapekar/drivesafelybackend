/*
 * @file: pdeclaration.js
 * @description: It Contain function layer for declaration controller.
 * @author: Manas Agrawal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/diagnostic";

import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add Declaration ***********/
export const addDeclaration = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveDeclaration(payload);
        res.status(200).json(successAction(result, Message.declarationAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Add Observation ***********/
export const addObservation = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveObservation(payload);
        res.status(200).json(successAction(result, Message.observationAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Add Observation ***********/
export const addReflection = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveReflection(payload);
        res.status(200).json(successAction(result, Message.reflectionAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Add Questionnaire Feedback ***********/
export const saveQuestionnaireFeedback = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveQuestionnaireFeedback(payload);
        res.status(200).json(successAction(result, Message.questionnariefeedbackAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};


/**************** Get declaration by id ***********/
export const getDeclaration = async (req, res, next) => {
    const payload = req.params;
    try {
        const result = await SERVICE.getDeclaration(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};




/**************** Get all declaration ***********/
export const getAllDeclaration = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllDeclaration(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update declaration ***********/
export const updateDeclaration = async (req, res, next) => {
    try {
        const data = await SERVICE.updateDeclaration(req.body);
        if (data) {
            res.json(successAction(data, Message.declarationUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete declaration ***********/
export const deleteDeclaration = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteDeclaration(req.params);
        if (data) {
            res.json(successAction(data, Message.declarationRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/********** Get Observation **********/
export const getDiagnostic = async  (req, res, next) => {
    try {
        console.log("req.params",req.query);
        const type = req.query.type?req.query.type:null;
        const data = await SERVICE.getDiagnostic(req.params,type);
        console.log(data,"data")
        if (data) {
            res.json(successAction(data, Message.declarationUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
}

export const getAllDiagnosticByUser = async (req, res, next) => {
    const payload = req.query; 
    try {
        const result = await SERVICE.getAllDiagnosticByUser(payload);
        return res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        console.error(error);
        return res.status(400).json(failAction(error.message));
    }
};

/**************** Add Steps ***********/
export const addSteps = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.addSteps(payload);
        res.status(200).json(successAction(result, Message.observationAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

