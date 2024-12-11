import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
   swaggerDefinition: {
      openapi: "3.0.2",
      tags: [
         {
            name: "Projects",
            description: "API operations related to Projects"
         },
         {
            name: "Tasks",
            description: "API operations related to Tasks"
         }
      ],
      info: {
         title: "UpTask - REST API Node.js + Expess + TypeScript",
         version: "1.0.0",
         description: "API Docs for UpTask"
      }
   },
   apis: ["./src/doc/**/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

const swaggertUiOptions : SwaggerUiOptions = {
   customCss: `
      .swagger-ui .topbar {
         background-color: #2b3b45;
      }
   `,
   customSiteTitle: "Documentación UpTask REST API Node.js + Express + TypeScript"
}
export default swaggerSpec;
export { swaggertUiOptions };