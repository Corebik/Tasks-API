/** 
* @swagger
* components:
*   schemas:
*       ValidatorError:
*           type: object
*           properties:
*               inputError:
*                   type: object
*                   properties:
*                       type:
*                           type: string
*                           example: "field"
*                           description: The type of error
*                       msg:
*                           type: string
*                           example: "Project name is required"
*                           description: The message of the error
*                       path:
*                           type: string
*                           example: "projectName"
*                           description: The path of the error
*                       location:
*                           type: string
*                           example: "body"
*                           description: The location of the error
* 
*/