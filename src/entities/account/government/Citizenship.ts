import { BaseEntity, BaseEntityOptions } from '@entities/BaseEntity';
import { Government } from './Government';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Persona } from '../persona/Persona';

export interface CitizenshipProps extends BaseEntityOptions {
  government: Government;
  hierarchyLevel: number;
  citizens: Persona[];
}

@Entity()
export class Citizenship extends BaseEntity {
  @ManyToOne()
  government: Government;

  @Property()
  hierarchyLevel: number;

  @ManyToMany(() => Persona, (p) => p.citizenships, { owner: true })
  citizens = new Collection<Persona, Citizenship>(this);

  constructor(props: CitizenshipProps) {
    super(props);
    this.government = props.government;
    this.hierarchyLevel = props.hierarchyLevel;
    this.citizens.set(props.citizens);
  }
}
