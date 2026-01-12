import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';
import { Job } from '../organization/Job';
import { Citizenship } from '../government/Citizenship';
import { AlliancePersonal } from '../alliance/AlliancePersonal';
import { Authorization } from '@entities/auth/Authorization';

export interface PersonaOptions extends AccountOptions {
  username: string;
  password: string;
}

@Entity({ discriminatorValue: AccountType.PERSON })
export class Persona extends Account {
  @ManyToMany(() => Job, (j) => j.members)
  jobs = new Collection<Job, Persona>(this);

  @ManyToMany(() => Citizenship, (c) => c.citizens)
  citizenships = new Collection<Citizenship, Persona>(this);

  @ManyToMany(() => AlliancePersonal, (a) => a.persons)
  alliances = new Collection<AlliancePersonal, Persona>(this);

  @Property({ hidden: true, unique: true })
  username: string;

  @Property({ hidden: true })
  passwordHash: string;

  @OneToMany(() => Authorization, (authorization) => authorization.persona)
  authorizations = new Collection<Authorization, Persona>(this);

  constructor(
    options: Omit<PersonaOptions, 'password'> & { passwordHash: string },
  ) {
    super(options);
    this.username = options.username;
    this.passwordHash = options.passwordHash;
    this.type = AccountType.PERSON;
  }
}
