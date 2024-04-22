"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.getList = exports.getJudgementResult = exports.getAll = exports.get = exports.del = exports.add = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/judgement"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: qol.js
 * @description: It Contain function layer for qol controller.
 * @author: Pankaj Chaudhari
 */

/**************** Add Config ***********/
const add = async (req, res, next) => {
  let payload = req === null || req === void 0 ? void 0 : req.body;
  console.log(payload, "payload");
  const {
    level,
    levelJa,
    title,
    titleJa,
    description,
    descriptionJa,
    ...rest
  } = payload;
  try {
    const result = await SERVICE.saveJudgement({
      level: {
        en: level,
        ja: levelJa
      },
      title: {
        en: title,
        ja: titleJa
      },
      description: {
        en: description,
        ja: descriptionJa
      },
      ...rest
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.qolAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get All Judgement  ***********/
exports.add = add;
const getAll = async (req, res, next) => {
  try {
    const data = await SERVICE.getAll(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Get Judgement by id ***********/
exports.getAll = getAll;
const get = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.get(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Judgement by id ***********/
exports.get = get;
const getList = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  try {
    const result = await SERVICE.getQolInRange(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Update Judgement ***********/
exports.getList = getList;
const update = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
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
      level: {
        en: level,
        ja: levelJa
      },
      description: {
        en: description,
        ja: descriptionJa
      },
      title: {
        en: title,
        ja: titleJa
      }
    });
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Content ***********/
exports.update = update;
const del = async (req, res, next) => {
  try {
    const data = await SERVICE.del(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.qolRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

// get qol result from config
exports.del = del;
const getJudgementResult = async (req, res, next) => {
  console.log("Inside QOL Result Controller", req.body);
  const payload = req.body;
  try {
    const result = await SERVICE.getJudgementResult(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.getJudgementResult = getJudgementResult;