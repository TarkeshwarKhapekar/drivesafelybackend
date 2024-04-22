/*
 * @file: corporate.js
 * @description: It Contain function layer for corporate controller.
 * @author: Manas Agrawal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/corporate";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";


/**************** Add Corporate ***********/
export const addCorporate = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await SERVICE.saveCorporate(payload);
        res.status(200).json(successAction(result, Message.corporateAdded));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get Corporate by id ***********/
export const getCorporate = async (req, res, next) => {
    const payload = req.params;
    try {
        const result = await SERVICE.getCorporate(payload);
        res.status(200).json(successAction(result, Message.success));
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Get all Corporate ***********/
export const getAllCorporate = async (req, res, next) => {
    try {
        const data = await SERVICE.getAllCorporate(req.query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Update Corporate ***********/
export const updateCorporate = async (req, res, next) => {
    try {
        const data = await SERVICE.updateCorporate(req.body);
        if (data) {
            res.json(successAction(data, Message.corporateUpdated));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/**************** Delete Corporate ***********/
export const deleteCorporate = async (req, res, next) => {
    try {
        const data = await SERVICE.deleteCorporate(req.params);
        if (data) {
            res.json(successAction(data, Message.corporateRemoved));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};


