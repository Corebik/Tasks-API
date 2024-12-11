/** GET - Get a task
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}:
 *   get:
 *       summary: Gets a single task
 *       tags: [Tasks]
 *       description: Return a single task
 *       parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *              type: string
 *            required: true
 *            description: The project ID
 *            example: "5fcbf6c7d7f4b0b6a8f8b8b8"
 *          - in: path
 *            name: taskId
 *            schema:
 *              type: string
 *            required: true
 *            description: The task ID
 *            example: "5fcbf6c7d7f4b0b6a8f8b8b8"
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
 *                              project:
 *                                  $ref: "#/components/schemas/Task"
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
 * 
 *          405:
 *              description: Method not allowed
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
 *                                  example: "Not valid action"
 * 
 *          500:
 *              description: Internal server error - Getting project
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
 *                                  example: "Error getting project"
 */