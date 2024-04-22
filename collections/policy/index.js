/*
 * @file: index.js
 * @description: It Contain function layer for policy collection.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import policySchema from "./db-schema";

class QOL {
 
  static savePolicy(payload) {
    return this(payload).save();
  }
  
}

policySchema.loadClass(QOL);

export default mongoose.model("policy", policySchema);


