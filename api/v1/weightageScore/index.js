/*
 * @file: index.js
 * @description: It's combine all weightage routers.
 * @author: Siddhant Singh 
 */

import addWeightageScore from "./add-weightage";
import getWeightageScore from "./get-weightage-score"
import updateWeightageScore from "./update-score"

export default [
    addWeightageScore,
    getWeightageScore,
    updateWeightageScore
];
