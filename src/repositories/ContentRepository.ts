import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Content from '../models/Content';

@EntityRepository(Content)
export default class ContentRepository extends Repository<Content> {
  public async addContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Content);
    const { description, linkContent, lesson } = request.body;
    const content = repo.create({ description, linkContent, lesson });
    const errors = await validate(content);

    if (!errors.length) {
      return response.status(201).json(await repo.save(content));
    }

    return response.status(400).json(errors);
  }

  public async updateContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Content);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(201).json({ message: 'Content não encontrada.' });
    }

    const { description, linkContent, lesson } = request.body;

    if (description) {
      toUpdate.description = description;
    }

    if (linkContent) {
      toUpdate.linkContent = linkContent;
    }

    if (lesson) {
      toUpdate.lesson = lesson;
    }

    const res = await repo.save(toUpdate);

    return response.status(201).json(res);
  }

  public async deleteContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Content);
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
