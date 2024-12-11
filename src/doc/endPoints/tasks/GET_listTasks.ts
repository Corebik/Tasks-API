/** GET - List of tasks
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   get:
 *       summary: Gets a list of tasks
 *       tags: [Tasks]
 *       description: Return a list of tasks
 *       parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *                type: string
 *            required: true
 *            description: The project ID
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
 *                              tasks:
 *                                  type: array
 *                                  minItems: 2
 *                                  items:
 *                                      $ref: "#/components/schemas/Tasks"   
 * 
 *          404:
 *              description: Project not found - Getting project
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
 *          500:
 *              description: Internal server error - Getting tasks
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
 *                                  example: "Error getting tasks"
 */