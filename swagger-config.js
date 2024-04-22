/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Pankaj Chaudhari
 */
import swaggerJsDocs from "swagger-jsdoc";
import config from 'config';
const { swaggerURL, swaggerPort } = config.get('app');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Driving Safety project apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "Pankaj Chaudhari"
      },
      servers: [`${swaggerURL}`]
    },
    produces: ["application/json"],
    host: `${swaggerPort}`
  },
  apis: [
    "./api/v1/user/*.js",
    "./api/v1/notification/*.js",
    "./api/v1/pdeclaration/*.js",
    "./api/v1/diagnostic/*.js",
    "./api/v1/content_management/*.js",
    "./api/v1/questionnaire/*.js",
    "./api/v1/corporate_master/*.js",
    "./api/v1/qol/*.js",
    "./api/v1/weightageScore/*.js",
    "./api/v1/judgement/*.js",
    "./api/v1/policy/*.js",
    "./api/v1/SOXAI/*.js",
    "./api/v1/qol/*.js",
    "./api/v1/reflex/*.js",
  
  ],
  layout: "AugmentingLayout"
};
export default swaggerJsDocs(swaggerOptions);
