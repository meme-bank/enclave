import {
  ArrayType,
  Entity,
  Enum,
  EnumArrayType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v7 } from 'uuid';

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
export class Client {
  @PrimaryKey()
  ClientId: string = v7(); /* Здесь уже в отличие от аккаунта у нас UUID */

  @Property()
  ClientName: string; /* Имя приложения */

  @Property({ hidden: true })
  ClientSecret: string; /* Секрет приложения (интересно, какой) */

  /* Прямо относится к автооризации */
  @Property({ type: ArrayType })
  RedirectUris: string[] = []; /* Куда перенаправлять в итоге */

  @Property({ type: EnumArrayType<GrantTypes> })
  AllowedGrantTypes: GrantTypes[] = [
    GrantTypes.AUTHORIZATION_CODE,
    GrantTypes.REFRESH_TOKEN,
  ]; /* Какие разрешены методы авторизации */

  @Enum(() => TrustFactor)
  Trusted: TrustFactor; /* Чтобы не копировали моё приложение */
}
