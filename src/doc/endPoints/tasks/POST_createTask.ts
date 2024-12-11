/** POST - Create a new Task
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   post:
 *       summary: Creates a new task
 *       tags: [Tasks]
 *       description: Returns a new record in the database
 *       parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *                type: string
 *            description: The project ID
 *            example: "5fcbf6c7d7f4b0b6a8f8b8b8"
 *            required: true
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         name:
 *                            type: string
 *                            example: "Definir Librería de JS para carrusel"
 *                         description:
 *                            type: string
 *                            example: "Buscar la mejor librería de JS para carrusel"
 *       responses:
 *          201:
 *              description: Project created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              msg:
 *                                  type: string
 *                                  example: "Task created successfully"
 *                              task:
 *                                  $ref: "#/components/schemas/Task"
 * 
 *          400:
 *              description: Bad request - Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: false
 *                              errors:
 *                                  $ref: "#/components/schemas/ValidatorError"
 * 
 *          404:
 *              description: Not found - Project not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: false
 *                              msg:
 *                                  type: string
 *                                  example: "Project not found"
 *          500:
 *              description: Internal server error - Creating Project
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: false
 *                              msg:
 *                                  type: string
 *                                  example: "Error creating task"
 */