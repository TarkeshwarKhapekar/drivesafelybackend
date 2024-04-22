"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soxaiLogin = void 0;
var _response = require("../utilities/response");
var SERVICE = _interopRequireWildcard(require("../services/soxai"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @file: soxai.js
 * @description: It Contain function layer for soxai controller.
 * @author: Siddhant Singh
 */

/**************** Login user ***********/
const soxaiLogin = async (req, res, next) => {
  console.log("soxai");
  const payload = req.body;
  const user = req.user;
  Object.assign(payload, {
    userId: user.userId
  });
  console.log(req);
  try {
    const data = await SERVICE.soxaiLogin(payload, user);
    res.status(200).json((0, _response.successAction)(data, _messages.default.success));
  } catch (error) {
    res.status(200).json((0, _response.failAction)(error.message));
  }
};
exports.soxaiLogin = soxaiLogin;