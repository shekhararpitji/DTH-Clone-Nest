import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryColumn,
  } from "typeorm";
  import { Subscription } from './../subscription/subscription.entity';
  import { Channel } from "../channel/channel.entity";
  
  @Entity()
  export class Package {
    @PrimaryColumn()
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    category!: string;
  
    @Column()
    price!: number;
  
    @Column()
    duration!: string;
  
    @OneToMany(() => Channel, (channel) => channel.pack, { cascade: true })
    @JoinTable()
    channels!: Channel[];
  
    @OneToMany(() => Subscription, (subscription) => subscription.pack)
    subscription!: Subscription[];
  }
  