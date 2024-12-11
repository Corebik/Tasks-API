import { Router } from 'express';
import { check, param } from 'express-validator';
import { TaskController } from '../controllers/TaskController';
import {
   handleInputErrors,
   hasAuthorization,
   projectExists,
   taskBelongsToProject,
   taskExists,
} from '../middleware';

const router = Router();

router.param('projectId', projectExists);

router.post(
   '/:projectId/tasks',
   [
      //* Middlewares
      hasAuthorization,
      check('name', 'Task name is required').not().isEmpty(),
      check('description', 'The Description of the task is required').not().isEmpty(),
      handleInputErrors,
   ],
   //* Controller
   TaskController.createTask,
);

router.get(
   '/:projectId/tasks',
   //* Controller
   TaskController.getProjectTasks,
);

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.get(
   '/:projectId/tasks/:taskId',
   [
      //* Middlewares
      param('taskId', 'Invalid ID').isMongoId(),
      handleInputErrors,
   ],
   //* Controller
   TaskController.getTaskById,
);

router.put(
   '/:projectId/tasks/:taskId',
   [
      //* Middlewares
      hasAuthorization,
      param('taskId', 'Invalid ID').isMongoId(),
      check('name', 'Task name is required').not().isEmpty(),
      check('description', 'The Description of the task is required').not().isEmpty(),
      handleInputErrors,
   ],
   //* Controller
   TaskController.updateTask,
);

router.delete(
   '/:projectId/tasks/:taskId',
   [
      //* Middlewares
      hasAuthorization,
      param('taskId', 'Invalid ID').isMongoId(),
      handleInputErrors,
   ],
   //* Controller
   TaskController.deleteTask,
);

router.post(
   '/:projectId/tasks/:taskId/status',
   [
      //* Middlewares
      param('taskId', 'Invalid ID').isMongoId(),
      check('status', 'Task status is required').not().isEmpty(),
      handleInputErrors,
   ],
   //* Controller
   TaskController.updateStatus,
);

export default router;
