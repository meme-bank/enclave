import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';
import { AllianceMembering } from './AllianceMembering';
import { AlliancePersonal } from './AlliancePersonal';

export interface AllianceOptions extends AccountOptions {
  members: AllianceMembering[];
  persons: AlliancePersonal[];
}

@Entity({ discriminatorValue: AccountType.ALLIANCE })
export class Alliance extends Account {
  @OneToMany(() => AllianceMembering, (member) => member.alliance)
  members = new Collection<AllianceMembering, Alliance>(this);

  @OneToMany(() => AlliancePersonal, (personal) => personal.alliance)
  persons = new Collection<AlliancePersonal, Alliance>(this);

  constructor(options: AllianceOptions) {
    super(options);
    this.members.set(options.members);
    this.persons.set(options.persons);
    this.type = AccountType.ALLIANCE;
  }
}
