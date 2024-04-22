/*
 * @file: index.js
 * @description: It's combine all policy routers.
 * @author: Siddhant Singh
 */

import addPolicy from "./add-policy";
import getAllPolicy from "./get-policy";
import updatePolicy from "./update-policy"

export default [
    addPolicy,
    getAllPolicy,
    updatePolicy
];
