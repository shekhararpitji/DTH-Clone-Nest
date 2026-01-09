import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Package } from "../package/package.entity";

@Entity()
export class Channel {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Package, (pack) => pack.channels)
  pack!: Package;
}
