import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = ( req : Request, res : Response, next : NextFunction ) => {
   
   const errors = validationResult(req);
   if ( !errors.isEmpty() ) {

      res.status(400).json({ 
         ok: false,
         errors: errors.mapped() 
      });
      return;

   }
   next();

}