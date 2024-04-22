/*
 * @file: index.js
 * @description: It Contain function layer for steps collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import stepsSchema from "./db-schema";

class Steps {
 
  static saveSteps(payload) {
    return this(payload).save();
  }
  
}

stepsSchema.loadClass(Steps);

export default mongoose.model("steps", stepsSchema);


