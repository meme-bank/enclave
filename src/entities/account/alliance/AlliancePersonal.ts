import { BaseEntity, BaseEntityOptions } from '@entities/BaseEntity';
import { Alliance } from './Alliance';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Persona } from '../persona/Persona';

export interface AlliancePersonalProps extends BaseEntityOptions {
  alliance: Alliance;
  hierarchyLevel: number;
  persons: Persona[];
}

@Entity()
export class AlliancePersonal extends BaseEntity {
  @ManyToOne()
  alliance: Alliance;

  @Property()
  hierarchyLevel: number;

  @ManyToMany(() => Persona, (p) => p.alliances, { owner: true })
  persons = new Collection<Persona, AlliancePersonal>(this);

  constructor(props: AlliancePersonalProps) {
    super(props);
    this.alliance = props.alliance;
    this.hierarchyLevel = props.hierarchyLevel;
    this.persons.set(props.persons);
  }
}
