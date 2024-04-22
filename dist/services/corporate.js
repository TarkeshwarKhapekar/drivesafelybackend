"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCorporate = exports.saveCorporate = exports.getCorporate = exports.getAllCorporate = exports.deleteCorporate = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _corporate = _interopRequireDefault(require("../collections/corporate"));
var _user = _interopRequireDefault(require("../collections/user"));
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
 * @file: corporate.js
 * @description: It Contain function layer for corporate service.
 * @author: Manas Agrawal
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

/********** Save corporate **********/
const saveCorporate = async payload => {
  let saveData = await _corporate.default.saveUser(payload);
  return {
    name: saveData === null || saveData === void 0 ? void 0 : saveData.name,
    code: saveData === null || saveData === void 0 ? void 0 : saveData.code
  };
};

/********** Get corporate by id **********/
exports.saveCorporate = saveCorporate;
const getCorporate = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _corporate.default.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0
  });
  return await queryObj;
};

/********** Get all corporate **********/
exports.getCorporate = getCorporate;
const getAllCorporate = async payload => {
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
        name: {
          $regex: regex
        }
      }, {
        code: {
          $regex: regex
        }
      }]
    };
  }
  const pipeline = [{
    $match: matchObj
  }, {
    $lookup: {
      from: "users",
      // Assuming the collection name for users is "users"
      let: {
        corporateCode: "$code"
      },
      pipeline: [{
        $match: {
          $expr: {
            $and: [{
              $eq: ["$corporateCode", "$$corporateCode"]
            }, {
              $eq: ["$roles", "DRIVER"]
            }]
          }
        }
      }],
      as: "users"
    }
  }, {
    $project: {
      name: 1,
      code: 1,
      createdAt: 1,
      userCount: {
        $size: "$users"
      }
    }
  }, {
    $sort: sort
  }, {
    $skip: skip
  }, {
    $limit: limit
  }];
  const countPipeline = [{
    $match: matchObj
  }, {
    $count: "count"
  }];
  const [data, countResult] = await Promise.all([_corporate.default.aggregate(pipeline), _corporate.default.aggregate(countPipeline)]);
  const count = countResult.length > 0 ? countResult[0].count : 0;
  console.log(data);
  return {
    data: data,
    total: count,
    count: data.length
  };
};

/********** Update corporate **********/
exports.getAllCorporate = getAllCorporate;
const updateCorporate = async payload => {
  return await _corporate.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
};

/********** Delete corporate **********/
exports.updateCorporate = updateCorporate;
const deleteCorporate = async payload => {
  return await _corporate.default.findOneAndUpdate({
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
exports.deleteCorporate = deleteCorporate;