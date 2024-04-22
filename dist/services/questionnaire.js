"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuestion = exports.saveQuestion = exports.getQuestion = exports.getAllQuestionsCount = exports.getAllQuestionsBycount = exports.getAllQuestions = exports.deleteQuestion = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _questionnaire = _interopRequireDefault(require("../collections/questionnaire"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _universal = require("../utilities/universal");
var COMMON = _interopRequireWildcard(require("./common"));
var Mail = _interopRequireWildcard(require("../utilities/mail"));
var _config = _interopRequireDefault(require("config"));
var _mailchimp_marketing = _interopRequireDefault(require("@mailchimp/mailchimp_marketing"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: questionnaire.js
 * @description: It Contain function layer for questionnaire service.
 * @author: Pankaj Chaudhari
 */

const {
  mailchimp_key,
  mailchimp_audience_id
} = _config.default.get('app');
_mailchimp_marketing.default.setConfig({
  apiKey: mailchimp_key,
  server: 'us2'
});
const {
  frontendUrl
} = _config.default.get("app");
const formidable = require("formidable");
const form = formidable({
  multiples: true
});

/********** Save question **********/
const saveQuestion = async payload => {
  let saveData = await _questionnaire.default.saveQuestion(payload);
  return saveData;
};

/********** Get question by id **********/
exports.saveQuestion = saveQuestion;
const getQuestion = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _questionnaire.default.findone(matchObj);
  return await queryObj;
};

/********** Get all question **********/
exports.getQuestion = getQuestion;
const getAllQuestions = async payload => {
  let sort = {
    [payload.sortBy ? payload.sortBy : "createdAt"]: -1
  };
  let limit = payload.count ? JSON.parse(payload.count) : 20;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);
  let matchObj = {
    isDeleted: false
  };

  /****************Condition to check Search Parameters****************/
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{
        message: {
          $regex: regex
        }
      }]
    };
  }
  const queryObj = _questionnaire.default.find(matchObj);
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    questionnaire: data,
    total: count.length
  };
};
exports.getAllQuestions = getAllQuestions;
const getAllQuestionsBycount = async payload => {
  let sort = {
    [payload.sortBy ? payload.sortBy : "createdAt"]: -1
  };
  // let limit = payload.count ? JSON.parse(payload.count) : 20;
  // payload.page = payload.page ? payload.page : 1
  // let skip = JSON.parse((payload.page - 1) * limit);

  let matchObj = {
    isDeleted: false
  };
  let cnt = Number(payload.id);
  /****************Condition to check Search Parameters****************/
  // if (payload.search) {
  //     payload.search = payload.search.toLowerCase();
  //     const regex = new RegExp(`${payload["search"]}`, "i");
  //     matchObj = {
  //         ...matchObj,
  //         $or: [{ message: { $regex: regex } }]
  //     };
  // }
  // aggregate([{$sample:{size:2}}]).pretty();
  console.log("cnt");
  console.log(cnt);
  const queryObj = _questionnaire.default.aggregate([{
    $match: matchObj
  }, {
    $sample: {
      size: cnt
    }
  }]);
  let count = await queryObj;
  let data = await queryObj
  // .skip(skip)
  // .limit(limit)
  .sort(sort);
  return {
    questionnaire: data,
    total: count.length
  };
};

/********** Delete Notification **********/
exports.getAllQuestionsBycount = getAllQuestionsBycount;
const deleteQuestion = async payload => {
  return await _questionnaire.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload.id)
  }, {
    isDeleted: true
  }, {
    fields: {
      _id: 1
    },
    new: true
  });
};

/********** Update Notification **********/
exports.deleteQuestion = deleteQuestion;
const updateQuestion = async payload => {
  return await _questionnaire.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
};
exports.updateQuestion = updateQuestion;
const getAllQuestionsCount = async payload => {
  console.log("payload");
  console.log(payload);
  return {
    total: await _questionnaire.default.findByCondition(payload).countDocuments()
  };
};
exports.getAllQuestionsCount = getAllQuestionsCount;