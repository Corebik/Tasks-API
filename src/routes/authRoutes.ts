import { Router } from 'express';
import { check, param } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware';
import { authenticate } from '../middleware/authJWT';

const router = Router();

router.post(
   '/create-account',
   [
      //* Middleware
      check('email', 'Not valid email').isEmail(),
      check('name', 'The name is required').not().isEmpty(),
      check('password', 'The password is must be at least 8 characters').isLength({ min: 8 }),
      check('confirmPassword', 'The password is must be at least 8 characters').custom(
         (value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('Passwords do not match');
            }

            return true;
         },
      ),
      handleInputErrors,
   ],
   //*Controller
   AuthController.createAccount,
);

router.post(
   '/confirm-account',
   [
      //* Middleware
      check('token', 'Token can not be empty').not().isEmpty(),
      handleInputErrors,
   ],
   AuthController.confirmAccount,
);

router.post(
   '/login',
   [
      //* Middleware
      check('email', 'Not valid email').isEmail(),
      check('password', 'The password can not be empty').not().isEmpty(),
      handleInputErrors,
   ],
   AuthController.login,
);

router.post(
   '/request-code',
   [
      //* Middleware
      check('email', 'Not valid email').isEmail(),
      handleInputErrors,
   ],
   AuthController.requestConfirmationCode,
);

router.post(
   '/forgot-password',
   [
      //* Middleware
      check('email', 'Not valid email').isEmail(),
      handleInputErrors,
   ],
   AuthController.forgotPassword,
);

router.post(
   '/validate-token',
   [
      //* Middleware
      check('token', 'Token can not be empty').not().isEmpty(),
      handleInputErrors,
   ],
   AuthController.validateToken,
);

router.post(
   '/update-password/:token',
   [
      //* Middleware
      param('token', 'Invalid Token').isNumeric(),
      check('password', 'The password is must be at least 8 characters').isLength({ min: 8 }),
      check('confirmPassword', 'The password is must be at least 8 characters').custom(
         (value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('Passwords do not match');
            }

            return true;
         },
      ),
      handleInputErrors,
   ],
   AuthController.updatePasswordWithToken,
);

router.get('/user', [authenticate], AuthController.user);

//* Profile Routes

router.put(
   '/profile',
   [
      //* Middleware
      authenticate,
      check('name', 'The name is required').not().isEmpty(),
      check('email', 'Not valid email').isEmail(),
      handleInputErrors,
   ],
   AuthController.updateProfile,
);

router.post(
   '/update-password',
   [
      //* Middleware
      authenticate,
      check('currentPassword', 'The current password can not be empty').not().isEmpty(),
      check('password', 'The password is must be at least 8 characters').isLength({ min: 8 }),
      check('confirmPassword', 'The password is must be at least 8 characters').custom(
         (value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('Passwords do not match');
            }

            return true;
         },
      ),
      handleInputErrors,
   ],
   AuthController.updateUserPassword,
);

router.post(
   '/check-password',
   [
      authenticate,
      check('password', 'The current password can not be empty').not().isEmpty(),
      handleInputErrors,
   ],
   AuthController.checkPassword,
);

export default router;
