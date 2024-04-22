"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCorporate = exports.getCorporate = exports.getAllCorporate = exports.deleteCorporate = exports.addCorporate = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/corporate"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: corporate.js
 * @description: It Contain function layer for corporate controller.
 * @author: Manas Agrawal
 */

/**************** Add Corporate ***********/
const addCorporate = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await SERVICE.saveCorporate(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.corporateAdded));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Corporate by id ***********/
exports.addCorporate = addCorporate;
const getCorporate = async (req, res, next) => {
  const payload = req.params;
  try {
    const result = await SERVICE.getCorporate(payload);
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get all Corporate ***********/
exports.getCorporate = getCorporate;
const getAllCorporate = async (req, res, next) => {
  try {
    const data = await SERVICE.getAllCorporate(req.query);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.success));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Update Corporate ***********/
exports.getAllCorporate = getAllCorporate;
const updateCorporate = async (req, res, next) => {
  try {
    const data = await SERVICE.updateCorporate(req.body);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.corporateUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};

/**************** Delete Corporate ***********/
exports.updateCorporate = updateCorporate;
const deleteCorporate = async (req, res, next) => {
  try {
    const data = await SERVICE.deleteCorporate(req.params);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.corporateRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.deleteCorporate = deleteCorporate;