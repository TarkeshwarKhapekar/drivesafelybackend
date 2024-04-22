/*
 * @file: index.js
 * @description: It Contain function layer for reflex collection.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import reflexSchema from "./db-schema";

class Reflex {
  static saveReflexScreen(payload) {
    return this(payload).save();
  }  
}

reflexSchema.loadClass(Reflex);

export default mongoose.model("reflex", reflexSchema);


