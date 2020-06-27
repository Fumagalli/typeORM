import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Lesson from '../models/Lesson';

@EntityRepository(Lesson)
export default class LessonRepository extends Repository<Lesson> {
  public async addLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Lesson);
    const { description, classe } = request.body;
    const lesson = repo.create({ description, classe });
    const errors = await validate(lesson);

    if (!errors.length) {
      return response.status(201).json(await repo.save(lesson));
    }

    return response.status(400).json(errors);
  }

  public async updateLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Lesson);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(201).json({ message: 'Lesson não encontrada.' });
    }

    const { description, classe } = request.body;

    if (description) {
      toUpdate.description = description;
    }

    if (classe) {
      toUpdate.classe = classe;
    }

    const res = await repo.save(toUpdate);

    return response.status(201).json(res);
  }

  public async deleteLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Lesson);
    const toDelete = await repo.findOne(id);

    if (!toDelete) {
      return response
        .status(201)
        .json({ message: 'Nenhum registro encontrado com o id informado' });
    }

    await repo.delete(toDelete);

    return response
      .status(201)
      .json({ message: `${id} removido com sucesso!` });
  }
}
