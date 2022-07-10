import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SimpleUser } from './dto/simple-user.dto';

@ApiBearerAuth()
@ApiTags('Clients')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto) as Promise<SimpleUser>;
  }

  @Get()
  findAll() {
    return this.usersService.findAll() as unknown as Promise<Array<SimpleUser>>;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id) as unknown as Promise<SimpleUser>;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto) as unknown as Promise<SimpleUser>;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
