import { Router } from 'express';
import { check, param } from 'express-validator';

import { NoteController, ProjectController, TeamMemberController } from '../controllers';
import {
   authenticate,
   handleInputErrors,
   hasAuthorization,
   projectExists,
   taskBelongsToProject,
   taskExists,
} from '../middleware';

const router = Router();

router.use(authenticate);

router.post(
   '/',
   [
      check('projectName', 'Project name is required').not().isEmpty(),
      check('clientName', 'Client name is required').not().isEmpty(),
      check('description', 'The Description of the project is required').not().isEmpty(),
      handleInputErrors,
   ],
   //* Controller
   ProjectController.createProject,
);

router.get(
   '/',
   //* Controller
   ProjectController.getProjects,
);

router.get(
   '/:id',
   [
      //* Middleware
      param('id', 'Invalid ID').isMongoId(),
      handleInputErrors,
   ],
   //* Controller
   ProjectController.getProjectById,
);

router.param('projectId', projectExists);

router.put(
   '/:projectId',
   [
      //* Middleware
      hasAuthorization,
      param('projectId', 'Invalid ID').isMongoId(),
      check('projectName', 'Project name is required').not().isEmpty(),
      check('clientName', 'Client name is required').not().isEmpty(),
      check('description', 'The Description of the project is required').not().isEmpty(),
      handleInputErrors,
   ],
   //* Controller
   ProjectController.updateProject,
);

router.delete(
   '/:projectId',
   [
      //* Middleware
      hasAuthorization,
      param('projectId', 'Invalid ID').isMongoId(),
      handleInputErrors,
   ],
   //* Controller
   ProjectController.deleteProject,
);

//! ROUTES FOR TEAM

router.post(
   '/:projectId/team/find',
   [
      //* Middleware
      check('email', 'Not valid email').isEmail().toLowerCase(),
      handleInputErrors,
   ],
   TeamMemberController.findMemberByEmail,
);

router.get(
   '/:projectId/team',
   //* Controller
   TeamMemberController.getProjectTeam,
);

router.post(
   '/:projectId/team',
   [
      //* Middleware
      check('id', 'Not valid ID').isMongoId(),
      handleInputErrors,
   ],
   TeamMemberController.addMemberById,
);

router.delete(
   '/:projectId/team/:userId',
   [
      //* Middleware
      param('userId').isMongoId().withMessage('Invalid ID'),
      handleInputErrors,
   ],
   TeamMemberController.removeMemberById,
);

//! ROUTES FOR NOTES

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.post(
   '/:projectId/tasks/:taskId/notes',
   [
      //* Middleware
      check('content', 'The content of the note is required').not().isEmpty(),
      handleInputErrors,
   ],
   NoteController.createNote,
);

router.get('/:projectId/tasks/:taskId/notes', NoteController.getTaskNotes);

router.delete(
   '/:projectId/tasks/:taskId/notes/:noteId',
   [
      //* Middleware
      param('noteId', 'Not Valid ID').isMongoId(),
      handleInputErrors,
   ],
   NoteController.removeNote,
);

export default router;
