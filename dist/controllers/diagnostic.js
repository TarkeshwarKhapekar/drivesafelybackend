"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDeclaration = exports.saveQuestionnaireFeedback = exports.getDiagnostic = exports.getDeclaration = exports.getAllDiagnosticByUser = exports.getAllDeclaration = exports.deleteDeclaration = exports.addSteps = exports.addReflection = exports.addObservation = exports.addDeclaration = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/diagnostic"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: pdeclaration.js
 * @description: It Contain function layer for declaration controller.
 * @author: Manas Agrawal
 */

/**************** Add Declaration ***********/
const addDeclaration = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveDeclaration(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.declarationAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add Observation ***********/
exports.addDeclaration = addDeclaration;
const addObservation = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveObservation(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.observationAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add Observation ***********/
exports.addObservation = addObservation;
const addReflection = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveReflection(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.reflectionAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add Questionnaire Feedback ***********/
exports.addReflection = addReflection;
const saveQuestionnaireFeedback = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveQuestionnaireFeedback(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.questionnariefeedbackAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get declaration by id ***********/
exports.saveQuestionnaireFeedback = saveQuestionnaireFeedback;
const getDeclaration = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.getDeclaration(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get all declaration ***********/
exports.getDeclaration = getDeclaration;
const getAllDeclaration = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllDeclaration(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update declaration ***********/
exports.getAllDeclaration = getAllDeclaration;
const updateDeclaration = async (req, res, next) => {
  try {
    const data = await SERVICE.updateDeclaration(req.body);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.declarationUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete declaration ***********/
exports.updateDeclaration = updateDeclaration;
const deleteDeclaration = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteDeclaration(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.declarationRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/********** Get Observation **********/
exports.deleteDeclaration = deleteDeclaration;
const getDiagnostic = async (req, res, next) => {
  try {
    console.log("req.params", req.query);
    const type = req.query.type ? req.query.type : null;
    const data = await SERVICE.getDiagnostic(req.params, type);
    console.log(data, "data");
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.declarationUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.getDiagnostic = getDiagnostic;
const getAllDiagnosticByUser = async (req, res, next) => {
  const payload = req.query;
  try {
    const result = await SERVICE.getAllDiagnosticByUser(payload);
    return res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    console.error(error);
    return res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Add Steps ***********/
exports.getAllDiagnosticByUser = getAllDiagnosticByUser;
const addSteps = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.addSteps(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.observationAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};
exports.addSteps = addSteps;