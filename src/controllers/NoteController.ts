import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import Note, { INote } from '../models/Note';

type NoteParams = {
   noteId: Types.ObjectId;
};

export class NoteController {
   static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
      const { content } = req.body;
      const note = new Note();
      note.content = content;
      note.createdBy = req.user.id;
      note.task = req.task.id;

      req.task.notes.push(note.id);

      try {
         await Promise.allSettled([note.save(), req.task.save()]);
         res.status(201).json({ ok: true, msg: 'Note created successfully!' });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error creating note' });
      }
   };

   static getTaskNotes = async (req: Request, res: Response) => {
      try {
         const notes = await Note.find({ task: req.task.id });
         res.status(200).json({ ok: true, notes });
      } catch (error) {
         res.status(500).json({ ok: false, msg: 'Error getting notes' });
      }
   };

   static removeNote = async (req: Request<NoteParams>, res: Response) => {
      const { noteId } = req.params;
      const note = await Note.findById(noteId);

      if (!note) {
         res.status(404).json({ ok: false, msg: 'Note not found' });
         return;
      }

      if (note.createdBy.toString() !== req.user.id.toString()) {
         res.status(401).json({ ok: false, msg: 'Not valid action' });
         return;
      }

      req.task.notes = req.task.notes.filter((note) => note.toString() !== noteId.toString());

      try {
         await Promise.allSettled([note.deleteOne(), req.task.save()]);
         res.status(200).json({ ok: true, msg: 'Note deleted successfully!' });
      } catch (error) {}
   };
}
