import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
   static createProject = async (req: Request, res: Response) => {
      const project = new Project(req.body);

      //Assign Manager
      project.manager = req.user.id;

      try {
         const projectSaved = await project.save();
         res.status(201).json({
            ok: true,
            msg: 'Project created successfully',
            project: projectSaved,
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error creating project' });
      }
   };

   static getProjects = async (req: Request, res: Response) => {
      try {
         const projects = await Project.find({
            $or: [{ manager: { $in: req.user.id } }, { team: { $in: req.user.id } }],
         });
         res.status(200).json({ ok: true, projects });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error getting projects' });
      }
   };

   static getProjectById = async (req: Request, res: Response) => {
      try {
         const project = await Project.findById(req.params.id).populate('tasks');

         if (!project) {
            res.status(404).json({ ok: false, msg: 'Project not found' });
            return;
         }

         if (
            project.manager.toString() !== req.user.id.toString() &&
            !project.team.includes(req.user.id)
         ) {
            res.status(400).json({ ok: false, msg: 'Not valid action' });
            return;
         }

         res.status(200).json({ ok: true, project });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error getting project' });
      }
   };

   static updateProject = async (req: Request, res: Response) => {
      try {
         const project = await Project.findById(req.params.id);

         if (!project) {
            res.status(404).json({ ok: false, msg: 'Project not found' });
            return;
         }

         if (project.manager.toString() !== req.user.id.toString()) {
            res.status(400).json({ ok: false, msg: 'Only the manager can update the project' });
            return;
         }

         project.clientName = req.body.clientName;
         project.projectName = req.body.projectName;
         project.description = req.body.description;

         await project.save();

         res.status(200).json({ ok: true, msg: 'Project updated successfully' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error updating project' });
      }
   };

   static deleteProject = async (req: Request, res: Response) => {
      try {
         const project = await Project.findById(req.params.id);

         if (!project) {
            res.status(404).json({ ok: false, msg: 'Project not found' });
            return;
         }

         if (project.manager.toString() !== req.user.id.toString()) {
            res.status(400).json({ ok: false, msg: 'Only the manager can delete the project' });
            return;
         }

         await project.deleteOne();

         res.status(200).json({ ok: true, msg: 'Project deleted successfully' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error deleting project' });
      }
   };
}
