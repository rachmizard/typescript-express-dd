import { ValueObject } from '@/core/domain/ValueObject';
import { Result } from '@/core/logic/Result';

type UserUsernameProps = {
  value: string;
};

export class UserUsername extends ValueObject<UserUsernameProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: UserUsernameProps) {
    super(props);
  }

  public static create(username: string): Result<UserUsername> {
    return Result.ok<UserUsername>(new UserUsername({ value: username }));
  }
}
