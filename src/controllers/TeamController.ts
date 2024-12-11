import { Request, Response } from 'express';
import { Project } from '../models';
import User from '../models/User';

export class TeamMemberController {
   static findMemberByEmail = async (req: Request, res: Response) => {
      const { email } = req.body;

      // Find User
      const user = await User.findOne({ email }).select('_id name email');

      if (!user) {
         const error = new Error('User not found');
         res.status(404).json({ ok: false, msg: error.message });
         return;
      }

      res.status(200).json({ ok: true, user });
   };

   static getProjectTeam = async (req: Request, res: Response) => {
      const project = await Project.findById(req.project.id).populate({
         path: 'team',
         select: '_id name email',
      });

      res.status(200).json({ ok: true, team: project.team });
   };

   static addMemberById = async (req: Request, res: Response) => {
      const { id } = req.body;

      // Find User
      const user = await User.findById(id).select('_id name email');

      if (!user) {
         const error = new Error('User not found');
         res.status(404).json({ ok: false, msg: error.message });
         return;
      }

      if (req.project.team.includes(user.id.toString())) {
         const error = new Error('User already in this project.');
         res.status(409).json({ ok: false, msg: error.message });
         return;
      }

      req.project.team.push(user.id);
      await req.project.save();

      res.status(200).json({ ok: true, msg: 'Member added successfully!' });
   };

   static removeMemberById = async (req: Request, res: Response) => {
      const { userId } = req.params;

      if (!req.project.team.some((team) => team.toString() === userId)) {
         const error = new Error('This user does not belong to this project.');
         res.status(404).json({ ok: false, msg: error.message });
         return;
      }

      req.project.team = req.project.team.filter((member) => member.toString() !== userId);
      await req.project.save();

      res.status(200).json({ ok: true, msg: 'Member removed successfully!' });
   };
}
