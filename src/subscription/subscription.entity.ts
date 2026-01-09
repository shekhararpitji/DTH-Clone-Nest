import { Package } from '../package/package.entity';
import { User } from './../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Subscription {
  @PrimaryColumn()
  id!: string;

  @Column()
  startDate!: string;

  @Column()
  userId!: string;

  @Column()
  packId!: string;

  @Column()
  duration!: string;

  @ManyToOne(() => User, (user) => user.subscription)
  user!: User;

  @ManyToOne(() => Package, (pack) => pack.subscription)
  pack!: Package;
}
