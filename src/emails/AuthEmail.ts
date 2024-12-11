import { transporter } from '../config/nodemailer';

interface IEmail {
   email: string;
   name: string;
   token: string;
}

export class AuthEmail {
   static sendConfirmationEmail = async (user: IEmail) => {
      const info = await transporter.sendMail({
         from: 'UpTask <admin@uptask.com>',
         to: user.email,
         subject: 'UpTask - Please confirm your email',
         text: 'UpTask - Confirm your account',
         html: `
            <p>Hola, ${user.name}!, you've created an account on UpTask. You're almost done, just one last step to cofirm your account.</p>
            <p>Visit the following link: </p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm Account</a>
            <p>Enter this code: <b>${user.token}</b></p>
            <p>This code will expire in 10 minutes.</p>
         `,
      });

      console.log('Email sent:', info.messageId);
   };

   static sendPasswordResetToken = async (user: IEmail) => {
      const info = await transporter.sendMail({
         from: 'UpTask <admin@uptask.com>',
         to: user.email,
         subject: 'UpTask - Reset your password',
         text: 'UpTask - Reset your password',
         html: `
            <p>Hola, ${user.name}!, you're receiving this email because you (or someone else) has requested to reset your password. 
            </p> <p>Visit the following link: </p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset Password</a>
            <p>Enter this code: <b>${user.token}</b></p>
            <p>This code will expire in 10 minutes.</p>
         `,
      });

      console.log('Email sent:', info.messageId);
   };
}
