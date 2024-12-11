/** GET - Get a project
 * @swagger
 * /api/projects/{id}:
 *   get:
 *       summary: Gets a single project
 *       tags: [Projects]
 *       description: Return a single project
 *       parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
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
 *                              project:
 *                                  $ref: "#/components/schemas/Project"
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
 *
 */
