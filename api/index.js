/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Pankaj Chaudhari
 */

import user from "./v1/user";
import notification from "./v1/notification";
import declaration from "./v1/diagnostic";
import content from "./v1/content_management";
import diagnostic from "./v1/diagnostic";
import questionnaire from "./v1/questionnaire";
import corporate from "./v1/corporate_master";
import qol from "./v1/qol";
import policy from "./v1/policy";
import judgement from "./v1/judgement";
import weightageScore from "./v1/weightageScore";
import SOXAI from "./v1/SOXAI";
import reflex from "./v1/reflex";


/*********** Combine all Routes ********************/
export default [
    ...user,
    ...notification,
    ...declaration,
    ...content,
    ...diagnostic,
    ...questionnaire,
    ...corporate,
    ...qol,
    ...policy,
    ...judgement,
    ...weightageScore,
    ...SOXAI,
    ...reflex
];
