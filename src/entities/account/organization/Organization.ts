import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';
import { Government } from '../government/Government';

export interface OrganizationOptions extends AccountOptions {
  government: Government;
}

@Entity({ discriminatorValue: AccountType.ORGANIZATION })
export class Organization extends Account {
  @OneToMany(() => Organization, (child) => child.parent)
  children = new Collection<Organization, Organization>(this);

  @ManyToOne()
  parent: Organization | null = null;

  @ManyToOne(() => Government)
  government: Government;

  constructor(options: OrganizationOptions) {
    super(options);
    this.government = options.government;
    this.type = AccountType.ORGANIZATION;
  }
}
