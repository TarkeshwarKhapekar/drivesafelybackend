/*
 * @file: index.js
 * @description: It's combine all declaration routers.
 * @author: Manas Agrawal
 */

import addDeclaration from "./add-declaration";
import getDeclaration from "./get-declation";
import getAllDeclaration from "./get-all-declaration";
import updateDeclaration from "./update-declaration";
import deleteDeclaration from "./delete-declaration";
import addObservation from "./add-observation"
import addReflection from "./add-reflection"
import addQuestionnaireFeedback from "./add-questionnairefeedback"
import getDiagnostic  from "./get-diagnostic";
import getQOLResult from "./get-qol-result"
import getAllDiagnosticByUser from "./get-all-diagnostic"
import addSteps from "./add-steps"

export default [
    addDeclaration,
    getDeclaration,
    getAllDeclaration,
    addObservation,
    addReflection,
    addQuestionnaireFeedback,
    getDiagnostic,
    getQOLResult,
    getAllDiagnosticByUser,
    addSteps
    // updateDeclaration,
    // deleteDeclaration
];
