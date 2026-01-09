import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as UserDto from './dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  

    async findUserByEmail(email:string){
      const user= await this.userRepository.findOne({where:{email}});
      return user;
  }
  
   async findUsers(id:string){
        const user= await this.userRepository.findOne({where:{id}});
       const userData ={id:user.id,
        email:user.email,
      name:user.name,
    role:user.role,
  mobile:user.mobile_number};
  return userData;
    }

    

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
      }
    
   async createUser(user:UserDto.CreateUserDto):Promise<User>{
    const newId=uuid.v4();
    user.id=newId;
      user.password = await argon2.hash(user.password);
       return await this.userRepository.save(user);
    }

    async delete(email: string):Promise<DeleteResult> {
        return await this.userRepository.delete({ email: email});
      }

    async login({email, password}: UserDto.LoginUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where:{email}});
        if (!user) {
          
          return null;
        }
        if (await argon2.verify(user.password, password)) {
          return user;
        }
    
        return null;
      }
}
