import { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global {
   namespace Express {
      interface Request {
         project : IProject
      }
   }
}

export const projectExists = async( req : Request, res : Response, next : NextFunction ) => {
   
   try{

      const { projectId } = req.params;
      const project = await Project.findById(projectId);

      if( !project ) {
         res.status(404).json({ ok: false, msg: "Project not found" });
         return;
      }

      req.project = project;

      next();

   }catch(error){
      console.log(error);
      res.status(500).json({ ok: false, msg: "There's an error" });
   }

}