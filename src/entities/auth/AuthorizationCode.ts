import { Entity } from '@mikro-orm/core';
import {
  Authorization,
  AuthorizationType,
  type AuthorizationOptions,
} from './Authorization';

@Entity({ discriminatorValue: AuthorizationType.AUTHORIZATION_CODE })
export class AuthorizationCode extends Authorization {
  constructor(options: AuthorizationOptions) {
    super(options);
    this.type = AuthorizationType.AUTHORIZATION_CODE;
  }
}
