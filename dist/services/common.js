"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImagebase64 = exports.singleImageUpload = exports.multipleImageUpload = exports.createSlug = void 0;
var _universal = require("../utilities/universal");
/*
 * @file: common.js
 * @description: It Contain function layer for common controller.
 * @author: Smartdata
 */

// import pathpkg from "path";
var Jimp = require("jimp");
const imagePath = "./public/images/";
const mime = require('mime');
const fs = require('fs');
var filePath = "./data/file.txt";

/*
 * imageUpload file
 * Single and multiple both file
 */

const createSlug = async req => {
  req = req.replace(/\s+/g, "-");
  req = req.replace(/[`~!@#$%^&*()_\+=\[\]{};:"\\|\/,'.<>?\s]/g, "").toLowerCase();
  return req;
};
exports.createSlug = createSlug;
const singleImageUpload = async (myFile, imageLocation) => {
  try {
    let pathFile = `${imagePath}${imageLocation}/`;
    console.log("                 ");
    console.log("                 ");
    console.log("pathFile", JSON.stringify(pathFile));
    let imgNameArray = "";
    /* Handle multiple file upload */
    let fileName = myFile.name;
    fileName = fileName.replace(/\s+/g, "-").toLowerCase();
    fileName = Date.now() + (0, _universal.generateRandom)(4, true) + "-" + fileName;
    let path = pathFile + fileName;
    let data = await myFile.mv(path);
    try {
      await createDimensions(pathFile, fileName);
      imgNameArray = fileName;
    } catch (err) {
      console.log(err);
    }
    return imgNameArray;
  } catch (error) {
    console.log("                 ");
    console.log("singleImageUpload - > Erro", JSON.stringify(error));
    return error;
  }
};
exports.singleImageUpload = singleImageUpload;
const multipleImageUpload = async (myFile, imageLocation) => {
  try {
    let pathFile = `${imagePath}${imageLocation}/`;
    let imgNameArray = [];
    // let myFile = req.files.images;
    /* Handle multiple file upload */
    if (!!myFile.length) {
      for (let i = 0; i < myFile.length; i++) {
        let myfile = myFile[i];
        let fileName = myfile.name;
        fileName = fileName.replace(/\s+/g, "-").toLowerCase();
        fileName = Date.now() + (0, _universal.generateRandom)(4, true) + "-" + fileName;
        let path = pathFile + fileName;
        let data = await myfile.mv(path);
        try {
          await createDimensions(pathFile, fileName);
          imgNameArray.push(fileName);
        } catch (err) {
          console.log(err);
        }
      }
    }
    console.log(imgNameArray);
    return imgNameArray;
  } catch (error) {
    console.log("                 ");
    console.log("multipleImageUpload - > Erro", JSON.stringify(error));
    return error;
  }
};
exports.multipleImageUpload = multipleImageUpload;
const uploadImagebase64 = async (myFile, imageLocation) => {
  try {
    let imgNameArray = "";
    let response = "";
    // console.log("myFile",myFile);
    let pathFile = `${imagePath}${imageLocation}/`;
    var matches = myFile.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // console.log("matches",matches);
    let type = matches[1];
    let imageBuffer = new Buffer(matches[2], 'base64');
    let extension = mime.getExtension(type);
    let fileName = "image." + extension;
    console.log("fileName", fileName);
    /* Handle multiple file upload */
    // let fileName = myFile.name;
    // fileName = fileName.replace(/\s+/g, "-").toLowerCase();
    fileName = Date.now() + (0, _universal.generateRandom)(4, true) + "-" + fileName;
    let path = pathFile + fileName;
    let data = await fs.writeFileSync(path, imageBuffer, 'utf8');
    try {
      await createDimensions(pathFile, fileName);
      imgNameArray = fileName;
    } catch (err) {
      console.log(err);
    }
    return imgNameArray;
  } catch (error) {
    console.log("                 ");
    console.log("singleImageUpload - > Erro", error);
    return error;
  }
};
exports.uploadImagebase64 = uploadImagebase64;
let createDimensions = async (path, fileName) => {
  return await Promise.all([
  // Jimp.read(path + fileName).then(lenna => {
  //   lenna.scaleToFit(310, 290).quality(100).write(`${path}/310x290/${fileName}`);
  // }),

  Jimp.read(path + fileName).then(lenna => {
    lenna.scaleToFit(350, 220).quality(100).write(`${path}/350x220/${fileName}`);
  })]);
};