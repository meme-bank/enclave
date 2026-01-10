import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';
import { AllianceMembering } from '../alliance/AllianceMembering';
import { Organization } from '../organization/Organization';

export interface GovernmentOptions extends AccountOptions {
  displayName: string;
  capital: string;
  cities: string[];
  dependencyType: GovernmentDependencyType;
}

export enum GovernmentDependencyType {
  INDEPENDENT_STATE = 'independent_state',
  DEPENDENT_STATE = 'dependent_state',
  NATIONAL_PROVINCE = 'national_province',
  PROVINCE = 'province',
  SPECIAL_CITY = 'special_city',
}

@Entity({ discriminatorValue: AccountType.GOVERNMENT })
export class Government extends Account {
  @ManyToOne(() => Government, { nullable: true })
  parent?: Government;

  @OneToMany(() => Government, (child) => child.parent)
  subdivisions = new Collection<Government, Government>(this);

  @Property({ columnType: 'text[]' })
  cities: string[] = [];

  @Enum(() => GovernmentDependencyType)
  dependencyType!: GovernmentDependencyType;

  @Property()
  capital!: string;

  @ManyToMany(() => AllianceMembering, (a) => a.members)
  alliances = new Collection<AllianceMembering, Government>(this);

  @OneToMany(() => Organization, (organization) => organization.government)
  organizations = new Collection<Organization, Government>(this);

  constructor(options: GovernmentOptions) {
    super(options);
    this.capital = options.capital;
    this.cities = [...new Set([...options.cities, options.capital])]; // Избавляемся от дубликатов городов
    this.dependencyType = options.dependencyType;
    this.type = AccountType.GOVERNMENT;
  }
}
