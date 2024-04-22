"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePolicy = exports.getAllPolicy = exports.addPolicy = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/policy"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: policy.js
 * @description: It Contain function layer for policy controller.
 * @author: Siddhant Singh
 */

/**************** Add Qol ***********/
const addPolicy = async (req, res, next) => {
  let payload = req.body;
  console.log(req.body, "payload");
  try {
    const {
      title,
      titleJa,
      description,
      descriptionJa,
      rest
    } = payload;
    const result = await SERVICE.savePolicy({
      title: {
        en: title,
        ja: titleJa
      },
      description: {
        en: description,
        ja: descriptionJa
      }
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.policyAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get All policy  ***********/
exports.addPolicy = addPolicy;
const getAllPolicy = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllPolicy();
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update Policy ***********/
exports.getAllPolicy = getAllPolicy;
const updatePolicy = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  try {
    const {
      _id,
      title,
      titleJa,
      description,
      descriptionJa
    } = payload;
    const data = await SERVICE.updatePolicy({
      _id,
      title: {
        en: title,
        ja: titleJa
      },
      description: {
        en: description,
        ja: descriptionJa
      }
    });
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.policyUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.updatePolicy = updatePolicy;