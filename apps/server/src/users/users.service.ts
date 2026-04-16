import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/users/repository/users.repository';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.usersRepository.update(id, dto);
  }
}
