"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDeclaration = exports.saveReflection = exports.saveQuestionnaireFeedback = exports.saveObservation = exports.saveDeclaration = exports.getDiagnostic = exports.getDeclaration = exports.getAllDiagnosticByUser = exports.getAllDeclaration = exports.deleteDeclaration = exports.addSteps = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _pdeclaration = _interopRequireDefault(require("../collections/pdeclaration"));
var _user = _interopRequireDefault(require("../collections/user"));
var _observation = _interopRequireDefault(require("../collections/observation"));
var _reflection = _interopRequireDefault(require("../collections/reflection"));
var _questionnairefeedback = _interopRequireDefault(require("../collections/questionnairefeedback"));
var _weightageScore = _interopRequireDefault(require("../collections/weightageScore"));
var _judgement = _interopRequireDefault(require("../collections/judgement"));
var _judgmentResult = _interopRequireDefault(require("../collections/judgmentResult"));
var _steps = _interopRequireDefault(require("../collections/steps"));
var QOLSERVICE = _interopRequireWildcard(require("../services/qol"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var COMMON = _interopRequireWildcard(require("./common"));
var Mail = _interopRequireWildcard(require("../utilities/mail"));
var _config = _interopRequireDefault(require("config"));
var _mailchimp_marketing = _interopRequireDefault(require("@mailchimp/mailchimp_marketing"));
var _joi = require("@hapi/joi");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: pdeclaration.js
 * @description: It Contain function layer for declaration service.
 * @author: Pankaj chaudhari
 */

var async = require('async');
const axios = require('axios');

// import {
//     encryptpassword,
//     generateToken,
//     generateRandom,
//     getTimeStamp
// } from "../utilities/universal";
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
async function calculateValue(A2) {
  let result = 100 - (A2 - 0.3) * 200;
  return result > 0 ? result : 0;
}
async function calculateSleepScore(A2) {
  let result = (10 - Math.abs(A2 - 7) * 2) * 10;
  return result > 0 ? result : 0;
}
async function calculateSleepTime(bedTime, wakeUpTime) {
  if (wakeUpTime <= bedTime) {
    wakeUpTime += 24; // Add 24 hours to account for next day wake-up time
  }

  let sleepTime = wakeUpTime - bedTime;
  return sleepTime;
}
async function calculatExerciseScore(A3) {
  // code to calculate exercise
  // if (A3 < 1000) {
  //     return 0;
  // } else {
  //     var result = (A3 / 5000) * 100;
  //     if (result > 100) {
  //         return 100;
  //     } else {
  //         return result;
  //     }
  // }
  // updated forumla from client  25/07/2023
  console.log("A3 = " + A3);
  let result = 100 - Math.abs(A3 - 8000) / 100;
  console.log("result", result);
  if (result > 0) {
    return result;
  } else {
    return 0;
  }
}
async function calculateStressScore(B4) {
  if (B4 > 25 && B4 <= 50) {
    return 100;
  } else {
    return 100 - Math.abs(B4 - 50) / 0.5;
  }
}
// IF((100-ABS(A10-8000)/100)>0,(100-ABS(A10-8000)/100))
// function excelFormulaToNodeJS(A10) {
//     let result = 100 - Math.abs(A10 - 8000) / 100;
//     if (result > 0) {
//       return result;
//     } else {
//       return 0;
//     }
//   }

async function getRingToken(email, password) {
  const axios = require('axios');
  let token;
  const payload = {
    "email": email,
    "password": password,
    "returnSecureToken": true
  };
  const url = "https://soxai-firebase.df.r.appspot.com/api/login";

  //   axios.post("url", {
  //     email: email,
  //     password: password,
  //     "returnSecureToken": true
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });

  try {
    const response = await axios.post(url, payload);
    token = response.data.refreshToken;
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  // console.log(token);
  return token;
}
async function getRingData(bearerToken) {
  const axios = require('axios');
  let ringData;
  const payload = `from(bucket: "SOXAI")
    |> range(start: -2d, stop: now())
    |> filter(fn: (r) => r["_measurement"] == "SX_Daily_Prod") 
    // |> filter(fn: (r) => r["uid"] == "uid1" or r["uid"] == "uid2")
    // |> filter(fn: (r) => r["_measurement"] == "SX_Detail_Prod") // This is for daily detail chart data
    |> filter(fn: (r) => r["_field"] == "activity_steps" or r["_field"] == "health_hr" or r["_field"] == "sleep_score" or r["_field"] == "activity_score" or r["_field"] == "health_score" or r["_field"] == "qol_score")
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;
  const url = "https://soxai-firebase.df.r.appspot.com/api/queryData?to_csv=false";
  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'text/plain' // Set Content-Type to text/plain
      }
    });

    ringData = response.data;
    // console.log(ringData);
  } catch (error) {
    console.log(error);
    throw new Error("Ring token is Expired");
  }
  // console.log(token);
  return ringData;
}

/********** Save declaration **********/
const saveDeclaration = async payload => {
  // Example usage
  const bedTime = Number(payload.bedTime.replace(":", ".").replace("PM", "").replace("AM", "").replace(/\s+/g, ''));
  const wakeUpTime = Number(payload.wake_upTime.replace(":", ".").replace("PM", "").replace("AM", "").replace(/\s+/g, ''));
  console.log("bedTime = " + bedTime + "wakeUpTime = " + wakeUpTime);
  const sleepTime = await calculateSleepTime(bedTime, wakeUpTime);
  console.log("sleepTime", sleepTime);
  const A2 = sleepTime; // Replace with your desired value for A2
  const calculatedValue = await calculateSleepScore(A2);
  console.log("calculatedValue", calculatedValue.toFixed());
  Object.assign(payload, {
    sleepScore: calculatedValue.toFixed()
  });
  console.log(payload);
  let saveData = await _pdeclaration.default.saveDelcaration(payload);
  return {
    _id: saveData._id,
    userId: saveData === null || saveData === void 0 ? void 0 : saveData.userId,
    bedTime: saveData === null || saveData === void 0 ? void 0 : saveData.bedTime,
    wake_upTime: saveData === null || saveData === void 0 ? void 0 : saveData.wake_upTime,
    meal: saveData === null || saveData === void 0 ? void 0 : saveData.meal,
    physical_condition: saveData === null || saveData === void 0 ? void 0 : saveData.physical_condition,
    fatigue_existence: saveData === null || saveData === void 0 ? void 0 : saveData.fatigue_existence,
    do_meditation: saveData === null || saveData === void 0 ? void 0 : saveData.do_meditation,
    memo: saveData === null || saveData === void 0 ? void 0 : saveData.memo,
    createdAt: saveData === null || saveData === void 0 ? void 0 : saveData.createdAt
  };
};

/********** Save Observation **********/
exports.saveDeclaration = saveDeclaration;
const saveObservation = async payload => {
  let saveData;
  let QOLResult;
  if (payload.deviceType == "RING" && (!payload.ringToken || payload.ringToken.trim() === "")) throw new Error("Ring token is required");
  // if (userExists) throw new Error(Message.emailAlreadyExists);
  if (payload.deviceType == "RING") {
    // Ring is in user
    console.log("fetching details from cloud storage");
    const RINGDATA = await getRingData(payload.ringToken.trim());
    payload.pulse = RINGDATA[1].health_hr;
    payload.QOL = RINGDATA[1].qol_score;
    payload.steps = RINGDATA[0].activity_steps;
    Object.assign(payload, {
      exerciseScore: RINGDATA[0].activity_score
    });
    Object.assign(payload, {
      stressScore: RINGDATA[1].health_score
    });
    Object.assign(payload, {
      sleepScore: RINGDATA[1].sleep_score
    });
    delete payload.ringToken;
    saveData = await _observation.default.saveObservation(payload);
    if (payload.QOL && saveData) {
      QOLResult = await QOLSERVICE.getQolResult({
        QOL_value: payload.QOL
      });
    }
  } else {
    // Manual Case
    const A3 = payload.steps; // Replace with your desired value for A3
    const calculatedValue = await calculatExerciseScore(A3);
    console.log("calculatedValue", calculatedValue);
    Object.assign(payload, {
      exerciseScore: calculatedValue
    });
    // Start: Calculate QOL for manual case 
    // Manual input QOL score = (stress score + sleep score + exercise score)/3
    let dmatchObj = {
      _id: _mongoose.default.Types.ObjectId(payload.declarationId)
    };
    const queryObj = await _pdeclaration.default.findByCondition(dmatchObj, {
      updatedAt: 0,
      loginToken: 0,
      createdAt: 0,
      password: 0
    });

    // 
    Object.assign(payload, {
      sleepScore: queryObj[0].sleepScore
    });
    console.log("queryObj", queryObj);
    console.log("sleepScore =", Number(queryObj[0].sleepScore));
    console.log("Steps =", payload.steps);
    console.log("ExerciseScore =", calculatedValue);
    const calculatedStress = await calculateStressScore(Number(payload.pulse));
    Object.assign(payload, {
      stressScore: calculatedStress
    });
    //    const QOL_Score = (( Number(queryObj[0].sleepScore) + Number(calculatedValue))/2);
    const QOL_Score = (calculatedStress + Number(queryObj[0].sleepScore) + Number(calculatedValue)) / 3;
    payload.QOL = QOL_Score;
    console.log("QOL Score Observation: " + QOL_Score);
    // End: Calculate QOL for manual case

    saveData = await _observation.default.saveObservation(payload);
    if (payload.QOL && saveData) {
      QOLResult = await QOLSERVICE.getQolResult({
        QOL_value: QOL_Score
      });
    }
  }

  // console.log(saveData, "saveData")
  return {
    observationData: saveData,
    QOLResult: QOLResult
  };
};

/********** Save Reflection **********/
exports.saveObservation = saveObservation;
const saveReflection = async payload => {
  console.log("Payload" + JSON.stringify(payload));
  //   // Example usage
  const A2 = payload.time; // Replace with your desired value for A2
  const calculatedValue = await calculateValue(A2);
  //   console.log(calculatedValue);     
  Object.assign(payload, {
    reflexScore: calculatedValue
  });
  let saveData = await _reflection.default.saveReflection(payload);
  return saveData;
};
exports.saveReflection = saveReflection;
const saveQuestionnaireFeedback = async payload => {
  console.log("Payload feedback" + JSON.stringify(payload));
  let totalScore = 0;
  let allQuestions = payload.response;
  allQuestions.forEach(element => {
    element.options.forEach(option => {
      if (option.selected) {
        totalScore = totalScore + option.scoreVal;
      }
    });
  });
  Object.assign(payload, {
    "totalScore": totalScore
  });
  let saveData = await _questionnairefeedback.default.saveFeedback(payload);
  return saveData;
};

/********** Get declaration by id **********/
exports.saveQuestionnaireFeedback = saveQuestionnaireFeedback;
const getDeclaration = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _pdeclaration.default.findByCondition(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0
  });
  return await queryObj;
};

/********** Get all declaration **********/
exports.getDeclaration = getDeclaration;
const getAllDeclaration = async payload => {
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
        meal: {
          $regex: regex
        }
      }]
    };
  }
  const queryObj = _pdeclaration.default.findByCondition(matchObj, {
    bedTime: 1,
    wake_upTime: 1,
    meal: 1,
    createdAt: 1
  });
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length
  };
};

/********** Update Declaration **********/
exports.getAllDeclaration = getAllDeclaration;
const updateDeclaration = async payload => {
  return await _pdeclaration.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
};

/********** Delete Declaration **********/
exports.updateDeclaration = updateDeclaration;
const deleteDeclaration = async payload => {
  return await _pdeclaration.default.findOneAndUpdate({
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

/********** Get diagnostic by id **********/
exports.deleteDeclaration = deleteDeclaration;
const getDiagnostic = async (payload, type) => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  console.log(matchObj._id, "matchObj");
  const declaration = await _pdeclaration.default.findByCondition(matchObj);
  const observation = await _observation.default.findByCondition({
    declarationId: matchObj._id
  });

  // const questionnaire = await QUESTIONNAIREFEEDBACKMODEL.findByCondition({ declarationId: matchObj._id });
  console.log(observation, "observation");
  const reflexaction = await _reflection.default.findByCondition({
    declarationId: matchObj._id
  });
  const overAllWeightage = await _weightageScore.default.find();
  console.log("overAllWeightage", overAllWeightage);
  const weightageValue = {
    sleepScore: overAllWeightage[0].sleepScore / 100,
    exerciseScore: overAllWeightage[0].exerciseScore / 100,
    stressScore: overAllWeightage[0].stressScore / 100,
    reflexScore: overAllWeightage[0].reflexScore / 100
  };
  console.log("weightageValue", weightageValue);

  // const resultArray = await Promise.all([declaration, observation, reflexaction]);

  // let sleepScore ①:  50%
  // let exerciseScore ②:  20%
  // let stresvscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlsScore ③: 20%
  // let reflexScore ④:  10%

  // Calculate Self-diagnosis score from last daty
  // meal:   "2 meals or less" 5 points deduction
  // Physical condition: "bad" 5 point deduction
  // Tired:   "be" 5 point deduction
  // Medication:   "bad" 5 point deduction
  // console.log("declarariont", declaration[0])

  let deductionCalculation = {
    meal: 0,
    pyhsicalCondition: 0,
    tired: 0,
    medication: 0,
    totalDeduction: 0
  };
  if (declaration[0].meal.length <= 2) {
    deductionCalculation.totalDeduction = deductionCalculation.totalDeduction + 5;
    deductionCalculation.meal = 5;
  }
  ;
  if (declaration[0].physical_condition !== "Good") {
    deductionCalculation.totalDeduction = deductionCalculation.totalDeduction + 5;
    deductionCalculation.pyhsicalCondition = 5;
  }
  ;
  if (declaration[0].fatigue_existence == "Yes") {
    deductionCalculation.totalDeduction = deductionCalculation.totalDeduction + 5;
    deductionCalculation.tired = 5;
  }
  ;
  if (declaration[0].do_meditation == "Yes") {
    deductionCalculation.totalDeduction = deductionCalculation.totalDeduction + 5;
    deductionCalculation.medication = 5;
  }
  ;
  console.log("deductionCalculation", deductionCalculation);
  let exerciseScore = await calculatExerciseScore(observation[0].steps);
  // calculate prefinal score: PreFinalScore:   (①*0.5 ) + (②*0.2 ) + (③*0.2 ) + (④* 0.1 )

  let scores = {
    sleepScore: 0,
    exerciseScore: 0,
    stressScore: 0,
    reflexScore: 0
  };
  if (observation[0].deviceType == "RING") {
    scores.sleepScore = Number(observation[0].sleepScore);
    scores.exerciseScore = Number(observation[0].exerciseScore);
    scores.stressScore = Number(observation[0].stressScore);
    ;
    scores.reflexScore = reflexaction[0].reflexScore;
    //stressScore
  } else {
    scores.sleepScore = Number(declaration[0].sleepScore);
    scores.exerciseScore = Number(observation[0].exerciseScore);
    scores.stressScore = Number(observation[0].stressScore);
    scores.reflexScore = reflexaction[0].reflexScore;
  }
  console.log("scores ", scores);
  const preFinalScore = Number(scores.sleepScore) * weightageValue.sleepScore + Number(scores.exerciseScore) * weightageValue.exerciseScore + Number(scores.stressScore) * weightageValue.stressScore + Number(scores.reflexScore) * weightageValue.reflexScore;
  // calcuate final judgement score :  PreFinalScore - TotalDeductionScore
  console.log("preFinalScore =", preFinalScore);
  console.log("deductionCalculation.totalDeduction =", deductionCalculation.totalDeduction);
  const finalJudgementScore = preFinalScore - deductionCalculation.totalDeduction;
  let score = {
    sleepScore: Number(declaration[0].sleepScore),
    exerciseScore: Number(observation[0].exerciseScore),
    stressScore: 15,
    reflexScore: Number(reflexaction[0].reflexScore),
    selfDiagnosisScore: deductionCalculation,
    // preFinalScore: ((Number(declaration[0].sleepScore) * 0.5) + (20 * 0.2) + (15 * 0.2) + (reflexaction[0].reflexScore * 0.1)), 
    preFinalScore: preFinalScore,
    //((Number(declaration[0].sleepScore) * weightageValue.sleepScore) + (Number(observation[0].exerciseScore) * weightageValue.exerciseScore) + (15 * weightageValue.stressScore) + (reflexaction[0].reflexScore * weightageValue.reflexScore)),
    finalJudgementScore: finalJudgementScore
    // (((Number(declaration[0].sleepScore) * 0.5) + (20 * 0.2) + (15 * 0.2) + (reflexaction[0].reflexScore * 0.1)) - deductionCalculation.totalDeduction)
  };
  // console.log("overAllWeightage",overAllWeightage)
  // let sleepScore ①:  50%
  // let exerciseScore ②:  20%
  // let stresvscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlsScore ③: 20%
  // let reflexScore ④:  10%

  // Level 5 (Best): 100-80 or more

  // Level 4 (adequate): Less than 80 to 60 or more

  // Level 3 (caution): Less than 60 to 40 or more

  // Level 2 (Warning): Less than 40 to 20 or more

  // Level 1 (dangerous): Less than 20 to 0 or more

  console.log("finalJudgementScore = ", finalJudgementScore);
  const qu = {
    $and: [{
      min_value: {
        $lte: finalJudgementScore
      }
    }, {
      max_value: {
        $gte: finalJudgementScore
      }
    }]
  };
  console.log("qu", JSON.stringify(qu));
  const finalResult = await _judgement.default.find(qu);
  console.log("finalResult = ", finalResult);
  const fResult = {
    "declarationId": _mongoose.default.Types.ObjectId(payload.id),
    "level": finalResult[0].level,
    "title": finalResult[0].title,
    "description": finalResult[0].description,
    "userId": _mongoose.default.Types.ObjectId(declaration[0].userId)
  };
  if (type === null) {
    const saveResult = await _judgmentResult.default.saveJudgement(fResult);
  }

  // await DECLARATIONMODEL.findOneAndUpdate(matchObj,{
  //     judgementResult :finalResult[0].
  // }); 10000 people will join this application

  return {
    declaration: declaration[0],
    observation: observation[0],
    // questionnaire: questionnaire[0],
    reflexaction: reflexaction[0],
    score: score,
    finalJudgement: finalResult
  };
};
exports.getDiagnostic = getDiagnostic;
const getAllDiagnosticByUser = async payload => {
  let sort = {
    [payload.sortBy ? payload.sortBy : "createdAt"]: -1
  };
  let limit = payload.count ? JSON.parse(payload.count) : 10;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);
  let matchObj = {
    isDeleted: false,
    userId: payload.id
  };
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      date: {
        $regex: regex
      }
    };
  }
  const queryObj = _judgmentResult.default.find(matchObj, {
    updatedAt: 1,
    createdAt: 1,
    level: 1,
    title: 1,
    description: 1,
    userId: 1,
    declarationId: 1
  });
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length
  };
};

/********** Save Steps **********/
exports.getAllDiagnosticByUser = getAllDiagnosticByUser;
const addSteps = async payload => {
  console.log("Payload" + JSON.stringify(payload));
  let saveData = await _steps.default.saveSteps(payload);
  // if (payload.QOL && saveData) {
  //     QOLResult = await QOLSERVICE.getQolResult({ QOL_value: 65 });
  //     // Object.assign(saveData,{qolResult:QOLResult[0]});      
  // }
  console.log(saveData, "saveData");
  return saveData;
};
exports.addSteps = addSteps;