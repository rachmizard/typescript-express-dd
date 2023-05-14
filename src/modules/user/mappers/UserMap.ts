import { Mapper } from '@/core/infra/Mapper';
import { UniqueEntityID } from '@/core/domain/UniqueEntityId';

import { User } from '../domain/User';
import { UserDTO } from '../dto/UserDTO';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserEntity } from '../infra/typeorm/UserEntity';

export default class UserMap extends Mapper<User, UserDTO, UserEntity> {
  public static toDomain(raw: UserEntity): User {
    if (raw === null) return null;

    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({ value: raw.password });

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toDTO(t: User): UserDTO {
    return {
      email: t.email.value,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }

  public static async toPersistence(t: User): Promise<Partial<UserEntity>> {
    return {
      id: t.id.toValue().toString(),
      email: t.email.value,
      password: await t.password.getHashedValue(),
    };
  }
}
