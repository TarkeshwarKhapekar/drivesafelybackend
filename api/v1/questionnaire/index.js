/*
 * @file: index.js
 * @description: It's combine all notification routers.
 * @author: Pankaj Chaudhari
 */

import addQuestion from "./add-question";
import getQuestion from "./get-question";
import getAllQuestions from "./get-all-questions";
import updateQuestion from "./update-question";
import deleteQuestion from "./delete-question";
import getQuestionBycount from "./get-all-questionsbycount";
import getQuestionCount from "./get-question-count";

export default [
  addQuestion,
  getQuestion,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
  getQuestionBycount,
  getQuestionCount
];
