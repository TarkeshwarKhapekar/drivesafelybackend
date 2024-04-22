/*
 * @file: index.js
 * @description: It's combine all corporate routers.
 * @author: Manas Agrawal
 */

import addCorporate from "./add-corporate";
import getAllCorporate from "./get-all-corporate";
import getCorporate from "./get-corporate";
import deleteCorporate from "./delete-corporate";
import updateCorporate from "./update-corporate";

export default [
    addCorporate,
    getAllCorporate,
    getCorporate,
    deleteCorporate,
    updateCorporate
];
