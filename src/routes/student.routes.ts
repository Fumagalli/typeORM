import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Student from '../models/Student';
import StudentRepository from '../repositories/StudentRepository';

const studentRouter = Router();

studentRouter.post('/', async (request, response) => {
  try {
    const repo = getCustomRepository(StudentRepository);
    return await repo.addStudent(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

studentRouter.get('/', async (request, response) => {
  response.json(await getRepository(Student).find());
});

studentRouter.get('/:key', async (request, response) => {
  response.json(
    await getRepository(Student).findOne({ key: request.params.key }),
  );
});

studentRouter.put('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(StudentRepository);
    return await repo.updateStudent(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

studentRouter.delete('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(StudentRepository);
    return await repo.deleteStudent(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

export default studentRouter;
