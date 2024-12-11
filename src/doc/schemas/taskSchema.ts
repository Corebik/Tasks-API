/** TASKS SCHEMA
* @swagger
* components:
*   schemas:
*       Tasks:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The project ID
*                   example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               name:
*                   type: string
*                   description: Name of the task
*                   example: "Definir Framework de CSS"
*               description:
*                   type: string
*                   description: description of the task
*                   example: "Buscar el mejor Framework de CSS para este proyecto"
*               status:
*                   type: string
*                   description: The status of the task
*                   example: "pending"
*               project:
*                    $ref: "#/components/schemas/Projects"
*               createdAt:
*                   type: string
*                   description: The date of creation
*                   example: "2022-01-01T00:00:00.000Z"
*               updatedAt:
*                   type: string
*                   description: The date of update
*                   example: "2022-01-01T00:00:00.000Z"
*/


/** TASK SCHEMA
* @swagger
* components:
*   schemas:
*       Task:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The Task ID
*                   example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               name:
*                   type: string
*                   description: Task name
*                   example: "Define the structure of the project"
*               description:
*                   type: string
*                   description: Task description
*                   example: "Create the structure of the project with React and Node.js"
*               status:
*                   type: string
*                   description: The status of the task
*                   example: "pending"
*               project:
*                   type: string
*                   description: The id of the project
*                   example: "5fcbf6c7d7f4b0b6a8f8b8b8"
*               createdAt:
*                   type: string
*                   description: The date of creation
*                   example: "2022-01-01T00:00:00.000Z"
*               updatedAt:
*                   type: string
*                   description: The date of update
*                   example: "2022-01-01T00:00:00.000Z"
*                   
*/