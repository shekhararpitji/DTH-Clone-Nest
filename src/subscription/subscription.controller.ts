import { Body, Controller, Delete, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.entity';

@Controller('/auth/subscription')
export class SubscriptionController {
    constructor(private subsService:SubscriptionService){}

    @Post('/subscribe')
    create(@Body()subsData:Partial<Subscription>) {
      
      return this.subsService.createSubs(subsData);
    }

    @Get('/:packId')
   async getUser(@Param()param:{packId:string}): Promise<Subscription>{
      const {packId}=param;
      const subs=await this.subsService.findSubs(packId) ;
      if(!subs){
        throw new UnauthorizedException('subs not found');
      }
      return subs;
    }

    @Delete('/unsubscribe/:subsId')
   async delete(@Param()param:{subsId:string}){
      const {subsId}=param;
      return await this.subsService.unsubscribe(subsId) ;
    }

    @Get('/')
      async  findAll(){
          return await this.subsService.findAll() ;
        }
}
