import { Account } from '@entities/account/Account';
import { Persona } from '@entities/account/persona/Persona';
import { Client } from '@entities/client/Client';
import {
  ArrayType,
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v7 } from 'uuid';

export enum RevocationReason {
  OTHER = 'other',
  EXPIRED = 'expired',
  LOGOUT = 'logout',
  BANNED = 'banned',
  ROTATED = 'rotated',
  SECURITY_MISMATCH = 'security_mismatch',
}

export enum AuthorizationType {
  AUTHORIZATION_CODE = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
}

export interface AuthorizationOptions {
  codeOrToken: string;
  createdAt: Date;
  userAgent?: string;
  fingerprint?: string;
  ipAddress?: string;
  permissions: string[];
  expiresAt?: Date;
  revokedAt?: Date;
  revokedReason?: RevocationReason;
  persona: Persona;
  client: Client;
  contextAccount: Account;
}

@Entity({
  abstract: true,
  discriminatorColumn: 'type',
  discriminatorMap: AuthorizationType,
  tableName: 'authorization_codes',
})
export abstract class Authorization {
  @PrimaryKey()
  jti: string = v7();

  @Property()
  @Index()
  codeOrToken: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, columnType: 'text' })
  userAgent?: string;

  @Property({ nullable: true, hidden: true })
  fingerprint?: string;

  @Property({ nullable: true })
  ipAddress?: string;

  @Property({ type: ArrayType })
  permissions: string[] = [];

  @Property({ nullable: true })
  expiresAt?: Date;

  @Property({ nullable: true })
  revokedAt?: Date;

  @Enum({ items: () => RevocationReason })
  revokedReason?: RevocationReason;

  @ManyToOne(() => Persona)
  persona: Persona;

  @ManyToOne(() => Account)
  contextAccount: Account;

  @ManyToOne(() => Client)
  client: Client;

  @Enum(() => AuthorizationType)
  type: AuthorizationType;

  constructor(options: AuthorizationOptions) {
    this.codeOrToken = options.codeOrToken;
    this.createdAt = options.createdAt;
    this.userAgent = options.userAgent;
    this.fingerprint = options.fingerprint;
    this.ipAddress = options.ipAddress;
    this.permissions = options.permissions;
    this.expiresAt = options.expiresAt;
    this.revokedAt = options.revokedAt;
    this.revokedReason = options.revokedReason;
    this.persona = options.persona;
    this.contextAccount = options.contextAccount;
    this.client = options.client;
  }
}
