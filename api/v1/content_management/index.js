/*
 * @file: index.js
 * @description: It's combine all content routers.
 * @author: Manas Agrawal
 */

import addContent from "./add-content";
import getContent from "./get-content";
import getAllContent from "./get-all-content";
import updateContent from "./update-content";
import deleteContent from "./delete-content";
import getContentByTpe from "./get-content-byType";
import topcontent from "./get-all-content-advertisment-drivingsafety";
import deleteContentImage from "./delete-content-image";
import deleteContentVideo from "./delete-content-video";

export default [
    addContent,
    getContent,
    getAllContent,
    updateContent,
    deleteContent,
    getContentByTpe,
    topcontent,
    deleteContentImage,
    deleteContentVideo
];
