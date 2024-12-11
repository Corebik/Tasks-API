/** PUT - Update a project
 * @swagger
 * /api/projects/{id}:
 *   put:
 *       summary: Updates a project
 *       tags: [Projects]
 *       description: Update a project
 *       parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The project ID
 *            example: "5fcbf6c7d7f4b0b6a8f8b8b8"
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          projectName:
 *                              type: string
 *                              example: "Ecommerce con React y Node.js"
 *                          clientName:
 *                              type: string
 *                              example: "Cesar Lozano"
 *                          description:
 *                              type: string
 *                              example: "Build an e-commerce with React, Node.js and MongoDB"
 *       responses:
 *          200:
 *              description: Sucessful response
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
 *                                  example: "Project updated successfully"
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
 *              description: Internal server error - Updating project
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
 *                                  example: "Error updating project"
 */