import { Entity } from '@/core/domain/Entity';
import { UniqueEntityID } from '@/core/domain/UniqueEntityId';
import { Result } from '@/core/logic/Result';

export class UserId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}
