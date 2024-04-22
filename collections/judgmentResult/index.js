/*
 * @file: index.js
 * @description: It Contain function layer for qol collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import judgementSchema from "./db-schema";

class JudgementClass {
 
  static saveJudgement(payload) {
    return this(payload).save();
  }

  
  
}


judgementSchema.loadClass(JudgementClass);

export default mongoose.model("judgementResult", judgementSchema);
