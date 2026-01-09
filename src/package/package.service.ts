import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Package } from './package.entity';
import * as PackDto from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as uuid from 'uuid';


@Injectable()
export class PackageService {
    constructor(@InjectRepository(Package) private packRepository:Repository<Package>){}
    

  

    async findAll(): Promise<Package[]> {
        const packs= await this.packRepository.find();
        if (!packs) {
            throw new UnauthorizedException('packs not found');
          }
        return packs;
      }

      async findPack(id:string){
        const pack= await this.packRepository.findOne({where:{id}});
        if (!pack) {
            throw new UnauthorizedException('pack not found');
          }
        return pack;
    }
    
   async createPack(pack:PackDto.CreatePackDto):Promise<Package>{
    const newId=uuid.v4();
    pack.id=newId;
       return await this.packRepository.save(pack);
    }

    async delete(packId: string):Promise<DeleteResult> {
        return await this.packRepository.delete({ id: packId});
      }

   
}
