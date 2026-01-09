import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';

@Controller('/auth/user')
export class UserController {
constructor(private userService:UserService){}


  
  @Get('/get/:userId')
  getUser(@Param()param:{userId:string}){
    const {userId}=param;
    return this.userService.findUsers(userId) ;
  }

  @Delete('/:email')
  delete(@Param()param:{email:string}): Promise<DeleteResult>{
    const {email}=param;
    return this.userService.delete(email) ;
  }

  @Get('/get')
  findAll(){
    return this.userService.findAll();
  }
}
