/** PROJECTS SCHEMA
* @swagger
* components:
*   schemas:
*       Projects:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The project ID
*                   example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               projectName:
*                   type: string
*                   description: Project name
*                   example: "Ecommerce con React y Node.js"
*               clientName:
*                   type: string
*                   description: Client name
*                   example: "Cesar Lozano"
*               description:
*                   type: string
*                   description: The description of the project
*                   example: "Build an e-commerce with React, Node.js and MongoDB"
*               tasks:
*                   type: array
*                   items:
*                       type: string
*                       example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               createdAt:
*                   type: string
*                   description: The date of creation
*                   example: "2022-01-01T00:00:00.000Z"
*               updatedAt:
*                   type: string
*                   description: The date of update
*                   example: "2022-01-01T00:00:00.000Z"
*/

/** PROJECT SCHEMA
* @swagger
* components:
*   schemas:
*       Project:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The project ID
*                   example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               projectName:
*                   type: string
*                   description: Project name
*                   example: "Ecommerce con React y Node.js"
*               clientName:
*                   type: string
*                   description: Client name
*                   example: "Cesar Lozano"
*               description:
*                   type: string
*                   description: The description of the project
*                   example: "Build an e-commerce with React, Node.js and MongoDB"
*               tasks:
*                   type: array
*                   items:
*                       $ref: "#/components/schemas/Task"
*               createdAt:
*                   type: string
*                   description: The date of creation
*                   example: "2022-01-01T00:00:00.000Z"
*               updatedAt:
*                   type: string
*                   description: The date of update
*                   example: "2022-01-01T00:00:00.000Z"
*/