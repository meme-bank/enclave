import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Alliance } from './Alliance';
import { BaseEntity, BaseEntityOptions } from '@entities/BaseEntity';
import { Government } from '../government/Government';

export interface AllianceMemberingProps extends BaseEntityOptions {
  alliance: Alliance;
  hierarchyLevel: number;
  members: Government[];
}

@Entity()
export class AllianceMembering extends BaseEntity {
  @ManyToOne(() => Alliance)
  alliance: Alliance;

  @Property()
  hierarchyLevel: number;

  @ManyToMany(() => Government, (member) => member.alliances, { owner: true })
  members = new Collection<Government, AllianceMembering>(this);

  constructor(options: AllianceMemberingProps) {
    super(options);
    this.alliance = options.alliance;
    this.hierarchyLevel = options.hierarchyLevel;
    if (options.members.length > 0) {
      this.members.set(options.members);
    }
  }
}
