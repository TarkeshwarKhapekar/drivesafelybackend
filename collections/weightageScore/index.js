/*
 * @file: index.js
 * @description: It Contain function layer for weightageScore collection.
 * @author: Siddhant Singh
 */

import mongoose from "mongoose";
import weightageScoreSchema from "./db-schema";

class ScoreClass {
  static saveScore(payload) {
    return this(payload).save();
  }
}

weightageScoreSchema.loadClass(ScoreClass);
export default mongoose.model("ScoreClass", weightageScoreSchema);

