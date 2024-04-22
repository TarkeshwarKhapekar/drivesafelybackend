/*
 * @file: index.js
 * @description: It's combine all judgement routers.
 * @author: Pankaj Chaudhari
 */

import addJudgement from "./add-judgement";
import getAllJudgement from "./get-all-judgements";
import updateJudgement from "./update-judgement"
import getJudgement from "./get-judgement"

export default [
    addJudgement,
    getAllJudgement,
    updateJudgement,
    getJudgement
];
