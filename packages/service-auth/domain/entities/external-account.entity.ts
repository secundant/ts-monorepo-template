import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExternalAccountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: ['google']
  })
  externalSystemName: 'google';

  @Column()
  externalUserId: string;

  @Column({
    type: 'jsonb'
  })
  externalProfile: Record<string, unknown>;
}
