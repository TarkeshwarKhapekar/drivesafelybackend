// /* 
//  * File Name: utilities/scheduler.js
//  * Created By: Prabhjot Kaur
//  * Description: cron job to transfer/payout amount to vendor after 5 hours of order completion.
//  */
// import mongoose from "mongoose";
// import USERMODEL from "../collections/user";
// import SUBSCRIBENEWSMODEL from "../collections/subscribeNew"
// import SUBSCRIBEMODEL from "../collections/subscribe"
// import moment from "moment";
// import * as Mail from "../utilities/mail";
// import config from "config";
// const { frontendUrl } = config.get("app");

// /*************************************
//     *    *    *    *    *    *
//     ┬    ┬    ┬    ┬    ┬    ┬
//     │    │    │    │    │    |
//     │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//     │    │    │    │    └───── month (1 - 12)
//     │    │    │    └────────── day of month (1 - 31)
//     │    │    └─────────────── hour (0 - 23)               9 
//     │    └──────────────────── minute (0 - 59)             0
//     └───────────────────────── second (0 - 59, OPTIONAL)   0

// ********************************************************/
// // '0 0 * * *' (*/1 * * * * (per minute))run command at 12 o'clock midnight everyday----//
// // 'this will run everyday at 9 Am');
// let schedule = require("node-schedule");

// schedule.scheduleJob("0 0 9 * * *", async () => {
//   /**
//    * @todo handle payouts implementation
//    */
//   try {


//     /*** @todo Sending Plan exipre Email to User Start  */

//     console.log("in TRY erro .....................");
//     const currentDate = new Date();
//     const nextDayDateStart = new Date(
//       new Date().getFullYear(),
//       new Date().getMonth(),
//       new Date().getDate() + 1,
//       0,
//       0
//     );
//     const nextDayDateEnd = new Date(
//       new Date().getFullYear(),
//       new Date().getMonth(),
//       new Date().getDate() + 2,
//       23,
//       59
//     );
//     console.log("                        ");
//     console.log("currentDate Date", currentDate)
//     console.log("                        ");
//     console.log("nextDayDateStart Date", nextDayDateStart)
//     console.log("                        ");
//     console.log("nextDayDateEnd Date", nextDayDateEnd)
//     const notifyUsers = await USERMODEL.find({
//       isDeleted: false,
//       status: true,
//       isVerified: "Y",
//       "$or": [{ "roles": "SP" }, { "roles": "C" }],
//       // $or: [{ userNotified: { $exists: false } }, { userNotified: false }],
//       exp_date: { $gte: nextDayDateStart, $lte: nextDayDateEnd }
//     }, { email: 1, firstName: 1, exp_date: 1 });
//     // moment("2020-06-28T19:34:08.748Z").format("dddd, MMMM Do YYYY, h:mm:ss a")

//     // await notifyUsers.forEach(async notifyUser => {
//     //   const expire = moment(notifyUser.exp_date).format("Do, MMM YYYY");
//     //   console.log("notifyUser", JSON.stringify(notifyUser));
//     //   console.log("                        ");
//     //   console.log("nextDayDateEnd Date",)
//     //   console.log("                        ");

//     //   const result = await Mail.htmlFromatWithObject({
//     //     email: notifyUser.email,
//     //     name: notifyUser.firstName,
//     //     expire: expire,
//     //     emailTemplate: "plan-exipre",
//     //   });

//     //   const emailData = {
//     //     to: notifyUser.email,
//     //     subject: Mail.subjects.planExpire,
//     //     html: result.html
//     //   };

//     //   Mail.SENDEMAIL(emailData, function (err, res) {
//     //     if (err)
//     //       console.log(
//     //         "-----@@----- Error at sending verify mail to user -----@@-----",
//     //         err
//     //       );
//     //     else
//     //       console.log(
//     //         "-----@@----- Response at sending verify mail to user -----@@-----",
//     //         res
//     //       );
//     //   });
//     // });

//     /*** @todo Sending Plan exipre Email to User END  */


//     /*** @todo Sending Email to SP / C whose plan expired Start  */

//     let obj = {
//       isDeleted: false,
//       status: true,
//       isVerified: "Y",
//       "plan.name": { $ne: "Basic" },
//       "$or": [{ "roles": "SP" }, { "roles": "C" }],
//       // $or: [{ userNotified: { $exists: false } }, { userNotified: false }],
//       exp_date: { $lte: nextDayDateStart }
//     }
//     console.log("expireUsers obj", JSON.stringify(obj));
//     console.log("                        ");
//     const expireUsers = await USERMODEL.find(obj, { email: 1, firstName: 1, exp_date: 1 });

//     await expireUsers.forEach(async expireUser => {
//       if (expireUser && expireUser.exp_date && expireUser.plan && expireUser.plan.name != "Basic") {
//         const expire = moment(expireUser.exp_date).format("Do, MMM YYYY");
//         console.log("expireUsers", JSON.stringify(expireUser));
//         console.log("                        ");
//         await USERMODEL.findOneAndUpdate({ _id: expireUser._id }, { isPlanExpired: true });

//         const result = await Mail.htmlFromatWithObject({
//           email: notifyUser.email,
//           name: notifyUser.firstName,
//           expire: expire,
//           emailTemplate: "plan-exipred",
//         });

//         const emailData = {
//           to: notifyUser.email,
//           subject: Mail.subjects.planExpire,
//           html: result.html
//         };

//         Mail.SENDEMAIL(emailData, function (err, res) {
//           if (err)
//             console.log(
//               "-----@@----- Error at sending verify mail to user -----@@-----",
//               err
//             );
//           else
//             console.log(
//               "-----@@----- Response at sending verify mail to user -----@@-----",
//               res
//             );
//         });
//       }
//     });

//     /*** @todo Sending Email to SP / C whose plan expired END  */


//   } catch (err) {
//     console.log("in catch erro .....................", err);
//   }
// });


// schedule.scheduleJob("*/1 * * * *", async () => {
//   try {
//     // console.log("                        ");
//     // console.log("SUBSCRIBENEWSMODEL Cron");
//     // console.log("                        ");
//     const notifyUsers = await SUBSCRIBENEWSMODEL.find({
//       isDeleted: false,
//       status: true
//     },
//       { email: 1, sendToall: 1, subject: 1, message: 1, subscribeId: 1, name: 1 }
//     ).limit(25);

//     await notifyUsers.map(async (user) => {
//       console.log("                        ");
//       console.log("user", JSON.stringify(user));
//       console.log("                        ");
//       const result = await Mail.htmlFromatWithObject({
//         name: user.name,
//         message: user.message,
//         emailTemplate: "subscribe",
//         unsubscribe: `${frontendUrl}unsubscribe/${user.email}`
//       });

//       const emailData = {
//         to: user.email,
//         subject: user.subject,
//         html: result.html,
//         templateId: "subscribe",
//       };
//       await Mail.SENDEMAILPOOL(emailData, async function (err, res) {
//         if (err)
//           console.log(
//             "-----@@----- Error at sending verify mail to user -----@@-----",
//             err
//           );
//         else {
//           let updateData2 = { isEmailSent: true, $push: { messages: { message: user.message } }, };
//           await SUBSCRIBEMODEL.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(user.subscribeId) }, updateData2, { new: true });
//           await SUBSCRIBENEWSMODEL.remove({ _id: mongoose.Types.ObjectId(user._id) });
//           // console.log(
//           //   "-----@@----- Response at sending verify mail to user -----@@-----",
//           //   res
//           // );
//         }
//       });
//     });

//   } catch (err) {
//     console.log("in catch erro .....................", err);
//   }
// });

