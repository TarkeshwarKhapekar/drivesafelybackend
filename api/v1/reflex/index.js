/*
 * @file: index.js
 * @description: It's combine all reflex routers.
 * @author: Siddhant Singh
 */
import addReflex from "./add-reflex";
import getReflexScreen from "./get-reflex";
import updateReflex from "./update-reflex";
import deleteReflexImage from "./delete-reflex-image"

export default [
    addReflex,
    getReflexScreen,
    updateReflex,
    deleteReflexImage
];
