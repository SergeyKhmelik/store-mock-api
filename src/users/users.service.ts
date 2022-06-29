import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      username: createUserDto.username,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      passwordHash: createUserDto.password,
    });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.password;
    return this.userModel.updateOne({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.deleteOne({ id });
  }
}
