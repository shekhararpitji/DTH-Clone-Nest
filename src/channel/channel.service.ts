import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Channel } from './channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as uuid from 'uuid';


@Injectable()
export class ChannelService {
    constructor(@InjectRepository(Channel) private channelRepository:Repository<Channel>){}
    

    async findChannel(id:string){
        const channel= await this.channelRepository.findOne({where:{id}});
        if (!channel) {
            throw new UnauthorizedException('Channel not found');
          }
        return channel;
    }

    async findAllChannel(): Promise<Channel[]> {
        
        const channels= await this.channelRepository.find();
        if (!channels) {
            throw new UnauthorizedException('Channel not found');
          }
          return channels;
      }
    
   async createChannel(channel:Partial<Channel>):Promise<Channel>{
    const newId=uuid.v4();
    channel.id=newId;
       const savedChannel= await this.channelRepository.save(channel);
       if (!savedChannel) {
        throw new UnauthorizedException('Channel not saved');
      }
    return savedChannel;
    }

    async delete(channelId: string):Promise<DeleteResult> {
        return await this.channelRepository.delete({ id: channelId});
      }

   
}
