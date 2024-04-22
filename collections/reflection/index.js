/*
 * @file: index.js
 * @description: It Contain function layer for observation collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import reflectionSchema from "./db-schema";

class Reflection {
  static saveReflection(payload) {
    return this(payload).save();
  }

  static findByCondition(condition) {
    return this.find(condition);
  }
}

reflectionSchema.loadClass(Reflection);
export default mongoose.model("Reflection", reflectionSchema);

