import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { payload } from './dto/payload.dto';

@Injectable()
export class JwtServices {
  
  generateToken(payload:payload): string {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '59m' });
  }

  verifyToken(token: string):any{
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return null;
    }
  }
}