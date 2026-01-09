import { Module ,MiddlewareConsumer,} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthMiddleware } from './auth.middleware';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes("auth")
  }}
