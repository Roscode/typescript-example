import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Account } from './Account';
import { Member } from './Member';

@Entity()
export class Team {
  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Account;

  @OneToMany(
    () => Member,
    member => member.team,
  )
  members: Member[];
}
