/*
 * @file: statistics.js
 * @description: It Contain count of dashboard API's router/api.
 * @author: Manas Agrawal
 */
import express from "express";
import { getDashboardData } from "../../../controllers/user";
const app = express();
import { checkToken } from "../../../utilities/universal";




app.get("/user/get-all-dashborad-data",
  // checkToken,
  getDashboardData);

export default app;
