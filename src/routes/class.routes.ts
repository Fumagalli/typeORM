import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Class from '../models/Class';
import ClassRepository from '../repositories/ClassRepository';

const classRouter = Router();

classRouter.post('/', async (request, response) => {
  try {
    const repo = getCustomRepository(ClassRepository);
    return await repo.addClass(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

classRouter.get('/', async (request, response) => {
  response.json(await getRepository(Class).find());
});

classRouter.get('/:name', async (request, response) => {
  response.json(
    await getRepository(Class).findOne({ name: request.params.name }),
  );
});

classRouter.put('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(ClassRepository);
    return await repo.updateClass(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

classRouter.delete('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(ClassRepository);
    return await repo.deleteClass(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

export default classRouter;
