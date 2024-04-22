/*
 * @file: index.js
 * @description: It Contain function layer for observation collection.
 * @author: Pankaj Chaudhari
 */

import mongoose from "mongoose";
import observationSchema from "./db-schema";

class Observation {
  static saveObservation(payload) {
    return this(payload).save();
  }

  static findByCondition(condition) {
    return this.find(condition);
  }
}

observationSchema.loadClass(Observation);
export default mongoose.model("Observation", observationSchema);

