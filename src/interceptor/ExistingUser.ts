import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
@Injectable()
export class ExistingUser implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}