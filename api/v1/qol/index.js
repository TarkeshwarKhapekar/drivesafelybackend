/*
 * @file: index.js
 * @description: It's combine all qol routers.
 * @author: Siddhant Singh
 */

import addQol from "./add-qol";
import getAllQol from "./get-all-qol"
import getQol from "./get-qol"
import updateQol from "./update-qol"
import deleteQol from "./delete-qol"
import getQolList from "./get-qol-list"
import deleteQolImage from "./delete-qol-image"
import deleteQolVideo from "./delete-qol-video"

export default [
    addQol,
    getAllQol,
    getQol,
    updateQol,
    deleteQol,
    deleteQolImage,
    deleteQolVideo
];
