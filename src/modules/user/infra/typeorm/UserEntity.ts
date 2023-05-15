import { IsNotEmpty, IsDate, Min, Max } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    primary: true,
  })
  id: string;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column({
    nullable: true,
  })
  @Unique(['username'])
  username: string;

  @Column({
    nullable: true,
  })
  profile_picture: string;

  @Column({
    nullable: true,
  })
  bio: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  @IsDate()
  birth_date: Date;

  @Column({
    nullable: true,
  })
  @Min(10)
  @Max(18)
  phone_number: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
