"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successAction = exports.failAction = void 0;
/*
 * @file: response.js
 * @description: It Contain function layer for api response status with data.
 * @author: Pankaj Chaudhari
 */

const successAction = (data, message = 'OK') => {
  return {
    statusCode: 200,
    data,
    message
  };
};
exports.successAction = successAction;
const failAction = (message = 'Fail', statusCode = 400) => {
  return {
    statusCode,
    data: null,
    message
  };
};
exports.failAction = failAction;