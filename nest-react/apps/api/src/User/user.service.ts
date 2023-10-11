import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {

    if (!this.isValidEmail(data.email)) {
      throw new BadRequestException('Invalid email format');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (!this.isValidPhoneNumber(data.phone)) {
      throw new BadRequestException('Invalid phone number format');
    }

    if (!this.isValidPassword(data.password)) {
      throw new BadRequestException('Invalid password format');
    }

    return this.prisma.user.create({
      data,
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  private isValidPassword(password: string): boolean {
    // Password validation rules:
    // - At least 8 characters long
    // - Contains at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }


  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (data.email) {
      const newEmail = data.email as string;

      if (!this.isValidEmail(newEmail)) {
        throw new BadRequestException('Invalid email format');
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { email: newEmail },
      });

      if (existingUser && existingUser.id !== where.id) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (data.phone) {
      const newPhone = data.phone as string;

      if (data.phone && !this.isValidPhoneNumber(newPhone)) {
        throw new BadRequestException('Invalid phone number format');
      }
    }

    if (data.password) {
      const newPassword = data.password as string;

      if (data.password && !this.isValidPassword(newPassword)) {
        throw new BadRequestException('Invalid password');
      }
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }



  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}