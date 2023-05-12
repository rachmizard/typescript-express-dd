import { Mapper } from '@/core/infra/Mapper';
import { User } from '../domain/User';
import { UserDTO } from '../dto/UserDTO';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UniqueEntityID } from '@/core/domain/UniqueEntityId';

export class UserMap implements Mapper<User> {
  public static toDomain(raw: any): User {
    if (raw === null) return null;

    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({ value: raw.password });

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
      },
      new UniqueEntityID(raw.id),
    );

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(t: User) {
    return {
      email: t.email.value,
      password: t.password.value,
    };
  }

  public static toDTO(t: User): UserDTO {
    return {
      email: t.email.value,
    };
  }
}
