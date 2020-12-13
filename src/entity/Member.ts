import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Account } from './Account';
import { Team } from './Team';

@Entity()
@Unique('member_email_account', ['email', 'account_id'])
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Account;

  @Column({nullable: true})
  team_name: string;

  @ManyToOne(() => Team)
  @JoinColumn([
    { name: 'team_name', referencedColumnName: 'name' },
    { name: 'account_id', referencedColumnName: 'account_id' },
  ])
  team: Team;
}
