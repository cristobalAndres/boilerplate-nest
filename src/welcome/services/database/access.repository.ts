import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Access } from '../../../core/entities/access/access.entity';

@Injectable()
export class AccessRepository {
  constructor(
    @InjectRepository(Access)
    private usersRepository: Repository<Access>,
  ) {}

  findAll(): Promise<Access[]> {
    return this.usersRepository.find();
  }
}
