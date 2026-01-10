import type { EntityProps } from '@/types/EntityProps';
import { BaseEntity, BaseEntityOptions } from '@entities/BaseEntity';
import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export enum AccountType {
  PERSON = 'person',
  ORGANIZATION = 'organization',
  GOVERNMENT = 'government',
  ALLIANCE = 'alliance',
}

export enum AccountStatus {
  PENDING,
  ACTIVE,
  DECLINED,
  BANNED,
}

export interface AccountOptions extends BaseEntityOptions {
  tagName: string;
  type: AccountType;
  status?: AccountStatus;
  vkId: number;
  vkToken?: string;
}

@Entity({
  discriminatorColumn: 'type',
  abstract: true,
})
export abstract class Account extends BaseEntity {
  @Property({ unique: true })
  tagName!: string; /* Ссылка типа крутой */

  @Enum(() => AccountType)
  type!: AccountType; /* Ну здесь то, почему это хуйня, а не человек */

  @Property({ columnType: 'bigint', unique: true })
  vkId!: number;

  get vkSignedId(): number {
    return this.type === AccountType.PERSON ? this.vkId : -this.vkId;
  }

  get vkDomainedId(): string {
    return `${this.type === AccountType.PERSON ? 'id' : 'club'}${this.vkId}`;
  }

  @Property({ nullable: true, hidden: true })
  vkToken?: string;

  @Enum(() => AccountStatus)
  accountStatus!: AccountStatus; /* Здесь статус, типа принят, не принят, либо ваще забаннен */

  @BeforeCreate()
  @BeforeUpdate()
  validateVkId() {
    this.vkId = Math.abs(this.vkId);
  }

  constructor(options: AccountOptions) {
    super(options);
    this.tagName = options.tagName;
    this.type = options.type;
    this.accountStatus = options.status ?? AccountStatus.PENDING;
    this.vkId = options.vkId;
    this.vkToken = options.vkToken;
  }
}
