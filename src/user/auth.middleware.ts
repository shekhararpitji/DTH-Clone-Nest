import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import 'dotenv/config';
import { JwtPayload } from './interface/jwtPaload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      try{const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload;
      
      const decodedId=decoded.id;
      const user = await this.userService.findUsers(decodedId);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.body.user = user;
    }catch(error){
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }
      next();

    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}