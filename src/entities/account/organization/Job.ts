import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Organization } from './Organization';
import { Persona } from '../persona/Persona';
import { BaseEntity, BaseEntityOptions } from '@entities/BaseEntity';

export interface JobProps extends BaseEntityOptions {
  organization: Organization;
  hierarchyLevel: number;
  members: Persona[];
  salary: number;
  currencyId: string;
}

@Entity()
export class Job extends BaseEntity {
  @ManyToOne()
  organization: Organization;

  @Property({ columnType: 'decimal(10,4)', type: 'decimal' })
  salary: number;

  @Property()
  currencyId: string;

  @Property()
  hierarchyLevel: number;

  @ManyToMany(() => Persona, (p) => p.jobs, { owner: true })
  members = new Collection<Persona, Job>(this);

  constructor(props: JobProps) {
    super(props);
    this.organization = props.organization;
    this.salary = props.salary;
    this.currencyId = props.currencyId;
    this.hierarchyLevel = props.hierarchyLevel;
    this.members.set(props.members);
  }
}
