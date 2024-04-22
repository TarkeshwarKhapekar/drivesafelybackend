"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateContent = exports.saveContent = exports.getContentByType = exports.getContent = exports.getAllContentTopcontents = exports.getAllContent = exports.deleteContentVideo = exports.deleteContentImage = exports.deleteContent = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _content = _interopRequireDefault(require("../collections/content"));
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
 * @file: content.js
 * @description: It Contain function layer for content service.
 * @author: Manas Agrawal
 */

const {
  mailchimp_key,
  mailchimp_audience_id
} = _config.default.get("app");
_mailchimp_marketing.default.setConfig({
  apiKey: mailchimp_key,
  server: "us2"
});
const {
  frontendUrl
} = _config.default.get("app");
const formidable = require("formidable");
const form = formidable({
  multiples: true
});

/********** Save content **********/
const saveContent = async payload => {
  let saveData = await _content.default.saveUser(payload);
  return {
    saveData
  };
};

/********** Get content by id **********/
exports.saveContent = saveContent;
const getContent = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _content.default.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0
  });
  return await queryObj;
};
exports.getContent = getContent;
const getContentByType = async payload => {
  let matchObj = {
    type: payload.type,
    isDeleted: false
  };
  console.log("inside server");
  console.log(matchObj);
  const queryObj = _content.default.find(matchObj);
  return await queryObj;
};

/********** Get all Content **********/
exports.getContentByType = getContentByType;
const getAllContent = async payload => {
  let sort = {
    [payload.sortBy ? payload.sortBy : "createdAt"]: -1
  };
  let limit = payload.count ? JSON.parse(payload.count) : 20;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);
  let matchObj;
  if (payload.show == "alltypes") {
    matchObj = {
      isDeleted: false
    };
  } else {
    matchObj = {
      $or: [{
        type: "Articles & Blogs"
      }, {
        type: "Other"
      }],
      isDeleted: false
    };
  }

  /****************Condition to check Search Parameters****************/
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{
        title: {
          $regex: regex
        }
      }]
    };
  }

  // Add filter based on the 'type' field
  if (payload.type) {
    matchObj = {
      ...matchObj,
      type: payload.type
    };
  }
  const queryObj = _content.default.find(matchObj);
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length
  };
};
exports.getAllContent = getAllContent;
const getAllContentTopcontents = async payload => {
  console.log("service in get conntetnt");
  let matchObj = {
    $or: [{
      type: "Advertisement"
    }, {
      type: "Traffic Safety Information"
    }],
    isDeleted: false
  };

  /****************Condition to check Search Parameters****************/
  // if (payload.search) {
  //     payload.search = payload.search.toLowerCase();
  //     const regex = new RegExp(`${payload["search"]}`, "i");
  //     matchObj = {
  //         ...matchObj,
  //         $or: [{ title: { $regex: regex } }]
  //     };
  // }

  // // Add filter based on the 'type' field
  // if (payload.type) {
  //     matchObj = {
  //         ...matchObj,
  //         type: payload.type,
  //     };
  // }

  const queryObj = _content.default.findByCondition(matchObj);
  // let count = await queryObj;
  let data = await queryObj;
  //     .skip(skip)
  //     .limit(limit)
  //     .sort(sort);
  return {
    data: data
    // total: count.length
  };
};
/********** Update Content **********/
exports.getAllContentTopcontents = getAllContentTopcontents;
const updateContent = async payload => {
  return await _content.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload.id)
  }, payload, {
    new: true
  });
};

/********** Delete Content **********/
exports.updateContent = updateContent;
const deleteContent = async payload => {
  return await _content.default.findOneAndUpdate({
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

/********** Delete Content Image**********/
exports.deleteContent = deleteContent;
const deleteContentImage = async payload => {
  const {
    id,
    image
  } = payload;
  console.log(payload, "servicepayload");
  const data = await _content.default.findByIdAndUpdate(id, {
    $pull: {
      images: image
    }
  }, {
    new: true
  });
  return data;
};

/********** Delete Content Video **********/
exports.deleteContentImage = deleteContentImage;
const deleteContentVideo = async payload => {
  const {
    id,
    video,
    videoID
  } = payload;
  console.log(payload, "servicepayload");
  const data = await _content.default.findByIdAndUpdate({
    _id: id
  }, {
    $pull: {
      videos: {
        _id: videoID
      }
    }
  }, {
    new: true
  });
  console.log(data, "data");
  return data;
  // const { id, video,videoID } = payload;
  // console.log(payload,"servicepayload");
  // // const data = await CONTENTMODEL.find({_id:id})
  // const data = await CONTENTMODEL.findByIdAndUpdate(
  //   { _id: mongoose.Types.ObjectId(id) },
  //   { $pull: { videos: { videoURL: video } } },
  //   { new: true }
  // );

  // db.collection.updateOne(
  //     { _id: ObjectId("64be6d0563afe6b410cfd532") },
  //     { $pull: { videos: { _id: ObjectId("64be6e8163afe6b410cfd546") } } }
  //  )
  // console.log(data,"data")
  // console.log(data[0].videos,"data")
  // return data;
};
exports.deleteContentVideo = deleteContentVideo;