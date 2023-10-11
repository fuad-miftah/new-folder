import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string; phone?: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; email?: string; password?: string; phone?: string },
  ): Promise<UserModel> {
    const where = { id };
    const data = userData;
    return this.userService.updateUser({ where, data });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    const where = { id };
    return this.userService.deleteUser(where);
  }
}