import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";

export enum AccountType {
  PERSON = "person",
  ORGANIZATION = "organization",
  GOVERMENT = "goverment",
  ALLIANCE = "alliance"
}

export enum AccountStatus {
  PENDING,
  ACTIVE,
  DECLINED,
  BANNED
}

@Entity()
export class Account {
  @PrimaryKey()
  AccountId!: number; /* Мы нацисты ебучие у каждого код типа есть */

  @Property()
  DisplayName!: string; /* Отображаемое имя */

  @Property({ unique: true })
  TagName!: string; /* Ссылка типа крутой */

  @Property({ columnType: "text" })
  Description?: string; /* Описание того, насколько эта хуйн крутая */

  @Enum(() => AccountType)
  AccountType!: AccountType; /* Ну здесь то, почему это хуйня, а не человек */

  @Enum(() => AccountStatus)
  AccountStatus!: AccountStatus; /* Здесь статус, типа принят, не принят, либо ваще забаннен */
}