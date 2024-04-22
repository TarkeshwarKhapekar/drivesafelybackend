/*
 * @file: index.js
 * @description: It's combine all notification routers.
 * @author: Manas Agrawal
 */

import addNotification from "./add-notification";
import getNotification from "./get-notification";
import getAllNotification from "./get-all-notification";
import deleteNotification from "./delete-notification";
import updateNotification from "./update-notification";
import deleteImage from "./delete-image"

export default [
  addNotification,
  getNotification,
  getAllNotification,
  deleteNotification,
  updateNotification,
  deleteImage
];
