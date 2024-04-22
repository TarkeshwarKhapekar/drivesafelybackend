"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWeightageScore = exports.getWeightageScore = exports.addWeightageScore = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/weightageScore"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: weightageScore.js
 * @description: It Contain function layer for weightageScore controller.
 * @author: Siddhant Singh
 */

/**************** Add Weightage Score ***********/
const addWeightageScore = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.weightageScore(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.score));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Weightage Score ***********/
exports.addWeightageScore = addWeightageScore;
const getWeightageScore = async (req, res, next) => {
  try {
    const result = await SERVICE.getWeightageScore();
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Update Weightage Score ***********/
exports.getWeightageScore = getWeightageScore;
const updateWeightageScore = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  try {
    const data = await SERVICE.updateWeightageScore(payload);
    console.log(data, "ooo");
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.scoreUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.updateWeightageScore = updateWeightageScore;