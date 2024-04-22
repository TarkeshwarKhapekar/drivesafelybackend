/*
 * @file: index.js
 * @description: It Contain function layer for pdeclaration collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import declarationSchema from "./db-schema";
class Delcaration {
  static saveDelcaration(payload) {
    return this(payload).save();
  }

  static findByCondition(condition) {
    return this.find(condition);
  }
}

declarationSchema.loadClass(Delcaration);
export default mongoose.model("Delcaration", declarationSchema);
