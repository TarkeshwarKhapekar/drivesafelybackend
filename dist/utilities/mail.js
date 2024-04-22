"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subjects = exports.htmlFromatWithObject = exports.SENDEMAILPOOL = exports.SENDEMAIL = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));
var _path = _interopRequireDefault(require("path"));
var _emailTemplates = require("email-templates");
var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

const sgMail = require('@sendgrid/mail');
const {
  smtpUser,
  smtpPass,
  smtpPort,
  smtpServer,
  mailFrom
} = _config.default.get("smtp");
const {
  smtpUser1,
  smtpPass1,
  smtpPort1,
  smtpServer1,
  mailFrom1
} = _config.default.get("smtp1");
const {
  frontendUrl,
  SEND_GRID_KEY
} = _config.default.get("app");
// sgMail.setApiKey(SEND_GRID_KEY);

const transporter = _nodemailer.default.createTransport((0, _nodemailerSmtpTransport.default)({
  host: smtpServer,
  // hostname
  port: smtpPort,
  // port for secure SMTP
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
}));
const transporter1 = _nodemailer.default.createTransport((0, _nodemailerSmtpTransport.default)({
  host: smtpServer1,
  // hostname
  port: smtpPort1,
  // port for secure SMTP
  auth: {
    user: smtpUser1,
    pass: smtpPass1
  }
}));
const subjects = {
  userAccount: "Account Details",
  forgetPassword: "Forgot Passsword",
  resetPassword: "Reset Passsword",
  contactUs: "New Query",
  registerRequest: "Sign Up",
  newRequest: "Driving Safety account create",
  booking: "Booking",
  bookingRequest: "Booking Request",
  planExpire: "Plan Exipre soon"
  //   newUserRequest: role => `Request as ${role}`
};
exports.subjects = subjects;
const dirPath = "../email-templates/";
const htmlFromatWithObject = async request => {
  request['home'] = `${frontendUrl}`;
  const tempDir = _path.default.resolve(__dirname, dirPath, request.emailTemplate);
  const template = new _emailTemplates.EmailTemplate(_path.default.join(tempDir));
  const html = await template.render({
    ...request
  });
  return {
    ...html,
    request
  };
};
exports.htmlFromatWithObject = htmlFromatWithObject;
const SENDEMAIL = (request, cb) => {
  let options = {
    from: mailFrom,
    to: request.to,
    // list of receivers
    subject: request.subject,
    // Subject line
    html: request.html // html body
  };

  if (request.cc) {
    options.cc = request.cc;
  }
  if (request.replyTo) {
    options.replyTo = request.replyTo;
  }
  if (request.files) {
    options.attachments = [{
      // filename: request.files.fileName,
      path: request.files.content
      // type: 'application/pdf',
      // disposition: 'attachment'
    }];
  }
  // Send by send grid  
  // console.log("options",JSON.stringify(options));
  // sgMail.send(options);

  // Send by node mailer
  transporter.sendMail(options, function (error, info) {
    // send mail with defined transport object
    console.log("           ");
    console.log("info   -----)   ", info);
    console.log("           ");
    console.log("error  -----)   ", error);
    if (error) {
      transporter1.sendMail(options, function (error1, info1) {
        // send mail with defined transport object
        console.log("           ");
        console.log("info 2  -----)   ", info1);
        console.log("           ");
        console.log("error 2 -----)   ", error1);
        // console.log(error, info);
        cb(error1, info1);
      });
    } // console.log(error, info);
    cb(error, info);
  });
};
exports.SENDEMAIL = SENDEMAIL;
const transporterPOOL = _nodemailer.default.createTransport((0, _nodemailerSmtpTransport.default)({
  host: smtpServer,
  // hostname
  port: smtpPort,
  // port for secure SMTP
  pool: true,
  secureConnection: true,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
}));
const SENDEMAILPOOL = async (request, cb) => {
  let options = {
    from: mailFrom,
    to: request.to,
    // list of receivers
    subject: request.subject,
    // Subject line
    html: request.html // html body
  };

  if (request.cc) {
    options.cc = request.cc;
  }
  if (request.replyTo) {
    options.replyTo = request.replyTo;
  }
  if (request.files) {
    options.attachments = [{
      // filename: request.files.fileName,
      path: request.files.content
      // type: 'application/pdf',
      // disposition: 'attachment'
    }];
  }
  // Send by node mailer
  await transporterPOOL.sendMail(options, function (error, info) {
    // send mail with defined transport object
    console.log("           ");
    console.log(" transporterPOOLinfo   -----)   ", info);
    console.log("           ");
    console.log("transporterPOOL error  -----)   ", error);
    cb(error, info);
  });
  transporterPOOL.close();
};
exports.SENDEMAILPOOL = SENDEMAILPOOL;