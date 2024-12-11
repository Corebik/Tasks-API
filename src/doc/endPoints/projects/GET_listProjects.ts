/** GET - List of projects
 * @swagger
 * /api/projects:
 *   get:
 *       summary: Gets a list of products
 *       tags: [Projects]
 *       description: Return a list of projects
 *       responses:
 *          200:
 *              description: Sucessful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  ok: 
 *                                      type: boolean
 *                                      example: true
 *                                  projects:
 *                                      type: array
 *                                      minItems: 2
 *                                      items:
 *                                          $ref: "#/components/schemas/Projects"                      
 * 
 *          500:
 *              description: Internal server error - Getting projects
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
 *                                  example: "Error getting projects"
 */