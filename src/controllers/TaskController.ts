import type { Request, Response } from 'express';
import { Task } from '../models';

export class TaskController {
   static createTask = async (req: Request, res: Response) => {
      try {
         const task = new Task(req.body);
         task.project = req.project.id;
         req.project.tasks.push(task.id);

         await Promise.allSettled([task.save(), req.project.save()]);

         res.status(201).json({ ok: true, msg: 'Task created successfully', task });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error creating task' });
      }
   };

   static getProjectTasks = async (req: Request, res: Response) => {
      try {
         const tasks = await Task.find({ project: req.params.projectId }).populate('project');
         res.status(200).json({ ok: true, tasks });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error getting tasks' });
      }
   };

   static getTaskById = async (req: Request, res: Response) => {
      try {
         const task = await Task.findById(req.task.id)
            .populate({ path: 'completedBy.user', select: 'id name email' })
            .populate({ path: 'notes', populate: { path: 'createdBy', select: 'id name email' } });

         res.status(200).json({ ok: true, task });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error getting task' });
      }
   };

   static updateTask = async (req: Request, res: Response) => {
      try {
         req.task.name = req.body.name;
         req.task.description = req.body.description;
         await req.task.save();

         res.status(200).json({ ok: true, msg: 'Task updated successfully' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error updating task' });
      }
   };

   static deleteTask = async (req: Request, res: Response) => {
      try {
         req.project.tasks = req.project.tasks.filter(
            (task) => task.toString() !== req.task.id.toString(),
         );

         await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

         res.status(200).json({ ok: true, msg: 'Task deleted successfully' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error deleting task' });
      }
   };

   static updateStatus = async (req: Request, res: Response) => {
      try {
         const { status } = req.body;
         req.task.status = status;

         const data = {
            user: req.user.id,
            status,
         };

         req.task.completedBy.push(data);

         await req.task.save();
         res.status(200).json({ ok: true, msg: 'Task status updated successfully' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error updating task status' });
      }
   };
}
