const FCM = require("fcm-node");
import config from 'config';
var serverKey = config.fcm
var fcm = new FCM(serverKey)
const axios = require('axios').default;

module.exports = {

    async sendNotification (receivers, message, notificationType,messageBody, notificationTitle) {

        let data = JSON.stringify(messageBody);
        try {
          for (const receiver of receivers) {
            if (receiver) {
              if (receiver.deviceToken == "" || receiver.deviceToken == null) { }
              else {

                // let testData = {
                //  "deviceTokenData" : receiver.deviceToken,
                //  "notificationTitle" : notificationTitle,
                //  message : message,
                //  data : data,
                //  notificationType : notificationType
                // }

               let fcmdata = await sendFcm(receiver.deviceToken, notificationTitle, message, data, notificationType)

                //   console.log("fcmdata",fcmdata)

              }
            }
          }
        } catch (err) {
          console.log("ERROR Fcm",err.message)

        }
    },

    async webNotification(reciever,message, sendData, notificationType, title){
        try {
            if(reciever){
                if(reciever[0].webToken != "" || reciever[0].webToken != null){
                    console.log("webPush")
                    var promise = new Promise(async (resolve, reject) => {
                        var messageBody = {
                            "notification": {
                                "title": title,
                                "body": message
                            },
                            "data":{
                                "notificationType": notificationType,
                                "notificationData": sendData
                            },
                            "to" : reciever[0].webToken
                        }
                        console.log(messageBody)

                        axios({
                            method: "POST",
                            url: 'https://fcm.googleapis.com/fcm/send',
                            data: messageBody,
                            headers: {
                              "Content-type": "application/json",
                              Authorization: `key=${process.env.fireBaseWebPushKeyPair}`,
                            },
                          })
                            .then(async function (response) {
                                resolve(response);
                            }).catch(function (error) {
                                reject(error);
                              })
                        // const data = await response.json(function (err, response) {
                        //     console.log('response web', response)
                        //     console.log('err', err)
                        //     if (err) {
                        //         reject(err);
                        //     } else {
                        //         resolve(response);

                        //     }
                        // });

                    });

                    return promise.then(
                        function (sv) {
                            return sv;
                        },
                        function (em) {}
                    );
                }
            }
        } catch (e) {
            console.log(e,"Error")
        }
    }
}

function sendFcm(deviceToken, title, detail, data, notificationType) {
    // console.log('data', data)
    try {
        var promise = new Promise((resolve, reject) => {
            var message = {
                to: deviceToken, // required fill with device token
                data: {
                    notificationData: data,
                    notificationType: notificationType,
                    notificationTitle: title,
                    notificationDescription: detail
                    //data
                },
                // data: data,
                // Removed notification for testing 13feb23
                            // notification: {
                            //     title: title,
                            //     body: detail,
                            //     sound: 'default',
                            //     // badge: 1
                            // }
            };


            fcm.send(message, function (err, response) {
                console.log('response', response)
                console.log('err', err)
                if (err) {
                    reject(err);
                } else {
                    resolve(response);

                }
            });
        });
        return promise.then(
            function (sv) {
                return sv;
            },
            function (em) {}
        );
    } catch (e) {
        console.log(e,"Error")
    }
}