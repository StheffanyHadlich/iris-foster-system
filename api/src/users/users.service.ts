import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const exists = await this.usersRepository.findByEmail(data.email);
    if (exists) throw new BadRequestException('Email já cadastrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.usersRepository.create({
      username: data.username,
      email: data.email,
      password: hashed,
    });

    const { password, ...safe } = user;
    return safe;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: number, data: UpdateUserDto) {
    const payload: any = { ...data };
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    return this.usersRepository.update(id, payload);
  }

  async remove(id: number) {
    await this.usersRepository.remove(id);
    return { removed: true };
  }
}
