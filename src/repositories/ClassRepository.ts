import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Class from '../models/Class';

@EntityRepository(Class)
export default class ClassRepository extends Repository<Class> {
  public async addClass(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Class);
    const { name, duration, lesson } = request.body;
    const classe = repo.create({ name, duration, lesson });
    const errors = await validate(classe);

    if (!errors.length) {
      return response.status(201).json(await repo.save(classe));
    }

    return response.status(400).json(errors);
  }

  public async updateClass(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Class);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(201).json({ message: 'Class não encontrada.' });
    }

    const { name, duration, lesson } = request.body;

    if (name) {
      toUpdate.name = name;
    }

    if (duration) {
      toUpdate.duration = parseInt(duration, 10);
    }

    if (lesson) {
      toUpdate.lesson = lesson;
    }

    const res = await repo.save(toUpdate);

    return response.status(201).json(res);
  }

  public async deleteClass(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Class);
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
