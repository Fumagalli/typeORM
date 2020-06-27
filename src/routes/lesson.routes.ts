import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Lesson from '../models/Lesson';
import LessonRepository from '../repositories/LessonRepository';

const lessonRouter = Router();

lessonRouter.post('/', async (request, response) => {
  try {
    const repo = getCustomRepository(LessonRepository);
    return await repo.addLesson(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

lessonRouter.get('/', async (request, response) => {
  response.json(await getRepository(Lesson).find());
});

lessonRouter.put('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(LessonRepository);
    return await repo.updateLesson(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

lessonRouter.delete('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(LessonRepository);
    return await repo.deleteLesson(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

export default lessonRouter;
