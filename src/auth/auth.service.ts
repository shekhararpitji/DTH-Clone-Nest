import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtServices} from './jwtService'
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/LoginUser.dto';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtServices,
    private readonly JwtServicess: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return {result};
    }
    return null;
  }

  async signUp(userData: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(userData.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const newUser= await this.userService.createUser(userData);

  return newUser;
  }

  async signIn(userData: LoginUserDto): Promise<any> {
    const user = await this.userService.login(userData);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.generateToken({email:user.email,name:user.name,id:user.id});
    return { user, token };
  }

  // private generateToken(userId: number ): string {
  //   const payload = { sub: userId, };
  //   return this.JwtServicess.sign(payload);
  // }
}