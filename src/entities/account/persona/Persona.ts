import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Account, AccountOptions, AccountType } from '../Account';
import { Job } from '../organization/Job';
import { Citizenship } from '../government/Citizenship';
import { hash as argon2Hash, verify as argon2Verify } from 'argon2';
import { AlliancePersonal } from '../alliance/AlliancePersonal';

export interface PersonaOptions extends AccountOptions {
  username: string;
  password: string;
}

@Entity({ discriminatorValue: AccountType.PERSON })
export class Persona extends Account {
  @ManyToMany(() => Job, (j) => j.members)
  jobs = new Collection<Job, Persona>(this);

  @ManyToMany(() => Citizenship, (c) => c.citizens)
  citizenships = new Collection<Citizenship, Persona>(this);

  @ManyToMany(() => AlliancePersonal, (a) => a.persons)
  alliances = new Collection<AlliancePersonal, Persona>(this);

  @Property({ hidden: true, unique: true })
  username: string;

  @Property({ hidden: true })
  passwordHash: string;

  constructor(
    options: Omit<PersonaOptions, 'password'> & { passwordHash: string },
  ) {
    super(options);
    this.username = options.username;
    this.passwordHash = options.passwordHash;
    this.type = AccountType.PERSON;
  }

  checkPassword(password: string): Promise<boolean> {
    return argon2Verify(this.passwordHash, password);
  }

  static async create(options: PersonaOptions): Promise<Persona> {
    const passwordHash = await argon2Hash(options.password);
    return new Persona({ ...options, passwordHash });
  }
}
