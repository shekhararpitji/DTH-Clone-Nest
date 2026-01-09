import { Channel } from './channel.entity';
import { Controller, Body,Delete,Post ,Param,Get, } from '@nestjs/common';
import * as ChannelDto from './dto/index';
import { DeleteResult } from 'typeorm';
import { ChannelService } from './channel.service';


@Controller('/auth/channel')
export class ChannelController {
    constructor(private channelService:ChannelService){}
    @Post('/create')
        create(@Body() channelData:ChannelDto.CreateChannelDto){
          
          return this.channelService.createChannel(channelData) ;
        }

        @Get('/:channelId')
        getUser(@Param()param:{channelId:string}): Promise<Channel>{
          const {channelId}=param;
          return this.channelService.findChannel(channelId) ;
        }
      
        @Delete('/:channelId')
        delete(@Param()param:{channelId:string}): Promise<DeleteResult>{
          const {channelId}=param;
          return this.channelService.delete(channelId) ;
        }
      
        @Get('/')
        findAll(){
          return this.channelService.findAllChannel() ;
        }
}