import { NextFunction, Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

declare global {
   namespace Express {
      interface Request {
         task: ITask;
      }
   }
}

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
         res.status(404).json({ ok: false, msg: 'Task not found' });
         return;
      }

      req.task = task;

      next();
   } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false, msg: "There's an error" });
   }
};

export const taskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {
   if (req.task.project.toString() !== req.project.id.toString()) {
      res.status(400).json({ ok: false, msg: 'Not valid action' });
      return;
   }

   next();
};

export const hasAuthorization = async (req: Request, res: Response, next: NextFunction) => {
   if (req.user.id.toString() !== req.project.manager.toString()) {
      res.status(400).json({ ok: false, msg: 'Not valid action' });
      return;
   }

   next();
};
