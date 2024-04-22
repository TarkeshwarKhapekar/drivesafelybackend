/*
 * @file: index.js
 * @description: It Contain function layer for qol collection.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import qolSchema from "./db-schema";

class QOL {
 
  static saveQol(payload) {
    return this(payload).save();
  }
  
}


qolSchema.loadClass(QOL);

export default mongoose.model("qol", qolSchema);
