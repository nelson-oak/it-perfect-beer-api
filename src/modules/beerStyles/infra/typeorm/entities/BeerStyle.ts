import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("beer_styles")
class BeerStyle {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  minimum_temperature: number;

  @Column()
  maximum_temperature: number;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { BeerStyle };
