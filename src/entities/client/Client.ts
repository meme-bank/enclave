import { Account } from '@entities/account/Account';
import { Authorization } from '@entities/auth/Authorization';
import { BaseEntity } from '@entities/BaseEntity';
import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  EnumArrayType,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

export enum GrantTypes {
  AUTHORIZATION_CODE = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password',
}

export enum TrustFactor {
  GRAY = 'gray',
  WHITE = 'white',
  INFRASTURE = 'infrastructure' /* Самое крутое доверие */,
  BLACK = 'black' /* Не хочу отображать кнопку Не спрашивать для таких приложений */,
  BANNED = 'banned' /* Не хочу чтобы они ваще могли проводить авторизацию */,
}

/* Приложение крч, которое хочет данные */
@Entity()
export class Client extends BaseEntity {
  @Property()
  clientName: string; /* Имя приложения */

  @Property({ hidden: true })
  clientSecretHash: string; /* Секрет приложения (интересно, какой) */

  /* Прямо относится к автооризации */
  @Property({ type: ArrayType })
  redirectUris: string[] = []; /* Куда перенаправлять в итоге */

  @ManyToOne(() => Account)
  owner: Account;

  @OneToMany(() => Authorization, (authorization) => authorization.client)
  authorizations = new Collection<Authorization, Client>(this);

  @Property({ type: EnumArrayType<GrantTypes> })
  allowedGrantTypes: GrantTypes[] = [
    GrantTypes.AUTHORIZATION_CODE,
    GrantTypes.REFRESH_TOKEN,
  ]; /* Какие разрешены методы авторизации */

  @Enum(() => TrustFactor)
  trustFactor: TrustFactor; /* Чтобы не копировали моё приложение */
}
