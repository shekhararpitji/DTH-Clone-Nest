import { Injectable } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';


@Injectable()
export class SubscriptionService {
    constructor(@InjectRepository(Subscription) private subsRepository:Repository<Subscription>){}

     async createSubs(subscribeData:Partial<Subscription>): Promise<Subscription> {
                 const newChannel = this.subsRepository.create(subscribeData);
                 const newId=uuid.v4();
    newChannel.id=newId;
                 const savedChannel = await this.subsRepository.save(newChannel);
                 return savedChannel;
             }

             async findSubs(id:string): Promise<Subscription| null> {
                return await this.subsRepository.findOne({where:{id}});
             }

            async findAll():Promise<Subscription[] | []> {
             return await this.subsRepository.find();
             }

            async unsubscribe(id:string) {
                const value= await this.subsRepository.delete({id});
                return value;
             }

}