"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReflex = exports.getReflexScreen = exports.deleteReflexImage = exports.addReflex = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/reflex"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _constants = require("../utilities/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: reflex.js
 * @description: It Contain function layer for reflex controller.
 * @author: Manas Agrawal
 */

/**************** Add Reflex Screen ***********/
const addReflex = async (req, res, next) => {
  var _req$files, _req$files2;
  const payload = req.body;
  console.log(payload);
  let image1 = "";
  let image2 = "";
  if (req !== null && req !== void 0 && (_req$files = req.files) !== null && _req$files !== void 0 && _req$files.reflexscreen1) {
    image1 = req.files.reflexscreen1[0].filename;
  } else {
    res.status(400).json((0, _response.failAction)("Please upload reflexscreen1."));
    return;
  }
  if (req !== null && req !== void 0 && (_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.reflexscreen2) {
    image2 = req.files.reflexscreen2[0].filename;
  } else {
    res.status(400).json((0, _response.failAction)("Please upload reflexscreen2."));
    return;
  }
  try {
    const result = await SERVICE.saveReflexScreen({
      reflexscreen1: image1,
      reflexscreen2: image2
    });
    res.status(200).json((0, _response.successAction)(result, _messages.default.reflexadd));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/**************** Get Reflex Screen ***********/
exports.addReflex = addReflex;
const getReflexScreen = async (req, res, next) => {
  try {
    const result = await SERVICE.getReflexScreen();
    res.status(200).json((0, _response.successAction)(result, _messages.default.success));
  } catch (error) {
    res.status(400).json((0, _response.failAction)(error.message));
  }
};

/********** Update Reflex **********/
exports.getReflexScreen = getReflexScreen;
const updateReflex = async (req, res, next) => {
  var _req$files3, _req$files4;
  const payload = req === null || req === void 0 ? void 0 : req.body;
  let image1 = "";
  let image2 = "";
  if (req !== null && req !== void 0 && (_req$files3 = req.files) !== null && _req$files3 !== void 0 && _req$files3.reflexscreen1) {
    image1 = req.files.reflexscreen1[0].filename;
  }
  if (req !== null && req !== void 0 && (_req$files4 = req.files) !== null && _req$files4 !== void 0 && _req$files4.reflexscreen2) {
    image2 = req.files.reflexscreen2[0].filename;
  }
  const updateData = {
    ...payload
  };
  if (image1) {
    updateData.reflexscreen1 = image1;
  }
  if (image2) {
    updateData.reflexscreen2 = image2;
  }
  try {
    const data = await SERVICE.updateReflex(updateData);
    console.log(data, "data");
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.reflexUpdated));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.updateReflex = updateReflex;
const deleteReflexImage = async (req, res, next) => {
  const payload = req === null || req === void 0 ? void 0 : req.body;
  try {
    const data = await SERVICE.deleteReflexImage(payload);
    if (data) {
      res.json((0, _response.successAction)(data, _messages.default.reflexRemoved));
    } else {
      res.json((0, _response.successAction)([]));
    }
  } catch (error) {
    res.json((0, _response.failAction)(error.message));
  }
};
exports.deleteReflexImage = deleteReflexImage;