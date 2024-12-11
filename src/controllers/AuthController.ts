import type { Request, Response } from 'express';
import { AuthEmail } from '../emails/AuthEmail';
import Token from '../models/Token';
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';
import { generateToken } from '../utils/token';

export class AuthController {
   static createAccount = async (req: Request, res: Response) => {
      try {
         const { password, email } = req.body;

         // Prevent duplicated emails
         const userExists = await User.findOne({ email });
         if (userExists) {
            const error = new Error('User already exists');
            res.status(409).json({ ok: false, msg: error.message });
            return;
         }

         // Create user
         const user = new User(req.body);

         //HASH password
         user.password = await hashPassword(password);

         // Generate Token
         const token = new Token();
         token.token = generateToken();
         token.user = user.id;

         // Send Email
         AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         // Save user
         await Promise.allSettled([user.save(), token.save()]);

         res.status(201).json({
            ok: true,
            msg: 'User created successfully! Please confirm your email',
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static confirmAccount = async (req: Request, res: Response) => {
      try {
         const { token } = req.body;

         const tokenExists = await Token.findOne({ token });

         // Verify Token
         if (!tokenExists) {
            const error = new Error('Token not found');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         // Modifiy User
         const user = await User.findById(tokenExists.user);
         user.confirmed = true;

         // Delete Token & save user
         await Promise.allSettled([tokenExists.deleteOne(), user.save()]);

         res.status(200).json({ ok: true, msg: 'User confirmed successfully!' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static login = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;
         const user = await User.findOne({ email });

         if (!user) {
            const error = new Error('User not found');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         if (!user.confirmed) {
            const token = new Token();
            token.user = user.id;
            token.token = generateToken();
            await token.save();

            // Send Email
            AuthEmail.sendConfirmationEmail({
               email: user.email,
               name: user.name,
               token: token.token,
            });

            const error = new Error(
               "This account is not verified. Check your email, we've sent you a confirmation code",
            );
            res.status(401).json({ ok: false, msg: error.message });
            return;
         }

         // Verify password
         const validPassword = await checkPassword(password, user.password);
         if (!validPassword) {
            const error = new Error('Password incorrect');
            res.status(401).json({ ok: false, msg: error.message });
            return;
         }

         const token = generateJWT({ id: user.id });

         res.status(200).json({
            ok: true,
            token,
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static requestConfirmationCode = async (req: Request, res: Response) => {
      try {
         const { email } = req.body;

         // user Exists
         const user = await User.findOne({ email });
         if (!user) {
            const error = new Error('This user does not exist');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         if (user.confirmed) {
            const error = new Error('This user is already confirmed');
            res.status(403).json({ ok: false, msg: error.message });
            return;
         }

         // Generate Token
         const token = new Token();
         token.token = generateToken();
         token.user = user.id;

         // Send Email
         AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         // Save user
         await Promise.allSettled([user.save(), token.save()]);

         res.status(201).json({
            ok: true,
            msg: 'New code sent successfully! Please check your email',
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static forgotPassword = async (req: Request, res: Response) => {
      try {
         const { email } = req.body;

         // user Exists
         const user = await User.findOne({ email });
         if (!user) {
            const error = new Error('This user does not exist');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         // Generate Token
         const token = new Token();
         token.token = generateToken();
         token.user = user.id;
         await token.save();

         // Send Email
         AuthEmail.sendPasswordResetToken({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         res.status(201).json({
            ok: true,
            msg: 'Please check your email and follow the instructions',
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static validateToken = async (req: Request, res: Response) => {
      try {
         const { token } = req.body;

         const tokenExists = await Token.findOne({ token });

         // Verify Token
         if (!tokenExists) {
            const error = new Error('Not valid token');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         res.status(200).json({ ok: true, msg: 'Token is valid, please change your password' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static updatePasswordWithToken = async (req: Request, res: Response) => {
      try {
         const { token } = req.params;
         const { password } = req.body;

         const tokenExists = await Token.findOne({ token });

         // Verify Token
         if (!tokenExists) {
            const error = new Error('Not valid token');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         // Set password
         const user = await User.findById(tokenExists.user);
         user.password = await hashPassword(password);

         await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

         res.status(200).json({ ok: true, msg: 'Password changed successfully!' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static user = async (req: Request, res: Response) => {
      res.status(200).json(req.user);
      return;
   };

   //* Profile Controller

   static updateProfile = async (req: Request, res: Response) => {
      const { name, email } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists && userExists.id.toString() !== req.user.id.toString()) {
         const error = new Error('This email already exists');
         res.status(409).json({ ok: false, msg: error.message });
         return;
      }

      req.user.name = name;
      req.user.email = email;

      try {
         await req.user.save();
         res.status(200).json({ ok: true, msg: 'Profile updated successfully!' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static updateUserPassword = async (req: Request, res: Response) => {
      const { currentPassword, password } = req.body;

      const user = await User.findById(req.user.id);

      const isPasswordCorrect = await checkPassword(currentPassword, user.password);
      if (!isPasswordCorrect) {
         const error = new Error('Current password is incorrect');
         res.status(401).json({ ok: false, msg: error.message });
         return;
      }

      try {
         user.password = await hashPassword(password);
         await user.save();

         res.status(200).json({ ok: true, msg: 'Password updated successfully!' });
         return;
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static checkPassword = async (req: Request, res: Response) => {
      const { password } = req.body;

      const user = await User.findById(req.user.id);

      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
         const error = new Error('The password is incorrect');
         res.status(401).json({ ok: false, msg: error.message });
         return;
      }

      res.status(200).json({ ok: true, msg: 'Password is correct!' });
   };
}
