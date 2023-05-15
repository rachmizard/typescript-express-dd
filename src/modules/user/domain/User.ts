import { AggregateRoot } from '@/core/domain/AggregateRoot';
import { UniqueEntityID } from '@/core/domain/UniqueEntityId';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserUsername } from './UserUsername';

interface UserProps {
  email: UserEmail;
  password?: UserPassword;
  username?: UserUsername;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get username() {
    return this.props.username;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public updateEmail(email: UserEmail): void {
    if (!this.email.equals(email)) {
      this.props.email = email;
    }
  }

  public updatePassword(password?: UserPassword): void {
    if (!password) return;

    const comparedSyncPassword = this.password.compareSyncPassword(password.value);
    if (!comparedSyncPassword) {
      this.props.password = password;
    }
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.username, argumentName: 'username' },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.errorValue());
    }

    const user = new User(props, id);

    return Result.ok<User>(user);
  }
}
