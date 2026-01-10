import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v7 } from 'uuid';

export interface BaseEntityOptions {
  displayName: string;
  description?: string | null;
}

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id: string = v7();

  // Данные
  @Property()
  displayName: string;

  @Property()
  description: string | null = null;

  // Временные метки
  @Property({ type: Date })
  createdAt: Date = new Date();

  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: Date })
  deletedAt: Date | null = null;

  constructor(options: BaseEntityOptions) {
    this.displayName = options.displayName;
    this.description = options.description ?? null;
  }
}
