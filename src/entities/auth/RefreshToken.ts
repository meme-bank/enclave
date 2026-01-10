import { Entity, Property } from '@mikro-orm/core';
import {
  Authorization,
  AuthorizationType,
  AuthorizationOptions,
} from './Authorization';

export type RefreshTokenOptions = AuthorizationOptions;

@Entity({ discriminatorValue: AuthorizationType.REFRESH_TOKEN })
export class RefreshToken extends Authorization {
  @Property({ default: 0 })
  rotationVersion: number = 0;

  constructor(options: RefreshTokenOptions) {
    super(options);
    this.type = AuthorizationType.REFRESH_TOKEN;
  }
}
