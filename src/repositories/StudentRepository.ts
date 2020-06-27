import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Student from '../models/Student';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  public async addStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Student);
    const { key, name, email } = request.body;
    const student = repo.create({ key, name, email });
    const errors = await validate(student);

    if (!errors.length) {
      return response.status(201).json(await repo.save(student));
    }

    return response.status(400).json(errors);
  }

  public async updateStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Student);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(201).json({ message: 'Student não encontrada.' });
    }

    const { name, key } = request.body;

    if (name) {
      toUpdate.name = name;
    }

    if (key) {
      toUpdate.key = key;
    }

    const res = await repo.save(toUpdate);

    return response.status(201).json(res);
  }

  public async deleteStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Student);
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
