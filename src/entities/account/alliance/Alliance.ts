import { Entity } from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';

export interface AllianceOptions extends AccountOptions {}

@Entity({ discriminatorValue: AccountType.ALLIANCE })
export class Alliance extends Account {
  constructor(options: AllianceOptions) {
    super(options);
    this.type = AccountType.ALLIANCE;
  }
}
