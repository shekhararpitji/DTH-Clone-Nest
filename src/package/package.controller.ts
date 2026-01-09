import { Controller, Body,Delete,Post ,Param,Get, } from '@nestjs/common';
import { PackageService } from './package.service';
import { Package } from './package.entity';
import * as PackDto from './dto/index';
import { DeleteResult } from 'typeorm';


@Controller('/auth/package')
export class PackageController {
    constructor(private packService:PackageService){}
    @Post('/create')
        create(@Body() packData:PackDto.CreatePackDto){
          
          return this.packService.createPack(packData);
        }

        @Get('/:packId')
        getUser(@Param()param:{packId:string}): Promise<Package>{
          const {packId}=param;
          return this.packService.findPack(packId) ;
        }
      
        @Delete('/:packId')
        delete(@Param()param:{packId:string}): Promise<DeleteResult>{
          const {packId}=param;
          return this.packService.delete(packId) ;
        }
      
        @Get('/')
        findAll(){
          return this.packService.findAll() ;
        }
}