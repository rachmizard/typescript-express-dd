import { Mapper } from '@/core/infra/Mapper';
import { UniqueEntityID } from '@/core/domain/UniqueEntityId';

import { User } from '../domain/User';
import { UserDTO } from '../dto/UserDTO';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserEntity } from '../infra/typeorm/UserEntity';
import { PaginationMeta } from '@/core/infra/PaginationMeta';

export default class UserMap extends Mapper<User, UserDTO, UserEntity> {
  public static toPaginatedDTO(total: number, page: number, limit: number): PaginationMeta {
    const hasNextPage = total > page * limit;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      hasNextPage,
      hasPreviousPage,
      limit,
      nextPage,
      page,
      previousPage,
      totalPages,
    };
  }

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
      id: t.id.toValue().toString(),
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
