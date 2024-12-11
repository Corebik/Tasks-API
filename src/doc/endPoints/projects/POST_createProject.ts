/** POST - Create a new project
 * @swagger
 * /api/projects:
 *   post:
 *       summary: Creates a new project
 *       tags: [Projects]
 *       description: Returns a new record in the database
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         projectName:
 *                            type: string
 *                            example: "Ecommerce con React y Node.js"
 *                         clientName:
 *                            type: string
 *                            example: "Cesar Lozano"
 *                         description:
 *                             type: string
 *                             example: "Build an e-commerce with React, Node.js and MongoDB"
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
 *                                  example: "Project created successfully"
 *                              project:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          example: "5fcbf6c7d7f4b0b6a8f8b8b8"
 *                                      projectName:
 *                                          type: string
 *                                          example: "Ecommerce con React y Node.js"
 *                                      clientName:
 *                                          type: string
 *                                          example: "Cesar Lozano"
 *                                      description:
 *                                          type: string
 *                                          example: "Build an e-commerce with React, Node.js and MongoDB"
 *                                      tasks:
 *                                          type: array
 *                                          maxItems: 0
 *                                          items:
 *                                              type: string
 *                                              example: "5fcbf6c7d7f4b0b6a8f8b8b8"
 *                                      createdAt:
 *                                          type: string
 *                                          example: "2022-03-24T14:30:00.000Z"
 *                                      updatedAt:
 *                                          type: string
 *                                          example: "2022-03-24T14:30:00.000Z"
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
 *                                  example: "Error creating project"
 */
