"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weightageScore = exports.updateWeightageScore = exports.getWeightageScore = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _content = _interopRequireDefault(require("../collections/content"));
var _weightageScore = _interopRequireDefault(require("../collections/weightageScore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: content.js
 * @description: It Contain function layer for content service.
 * @author: Manas Agrawal
 */

/********** Save Weightage Score **********/
const weightageScore = async payload => {
  let saveweightageScore = await _weightageScore.default.saveScore(payload);
  return {
    saveweightageScore
  };
};

/********** Get weightage score **********/
exports.weightageScore = weightageScore;
const getWeightageScore = async payload => {
  const queryObj = _weightageScore.default.find();
  return await queryObj;
};

/********** Update Weightage Score **********/
exports.getWeightageScore = getWeightageScore;
const updateWeightageScore = async payload => {
  console.log(payload);
  return await _weightageScore.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
};
exports.updateWeightageScore = updateWeightageScore;