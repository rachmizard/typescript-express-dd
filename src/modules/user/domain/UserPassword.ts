import * as bcrypt from 'bcrypt';
import { ValueObject } from '@/core/domain/ValueObject';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';

export interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static minLength = 6;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  /**
   * @method compareSyncPassword
   * @desc Compares as plain-text and hashed password.
   */

  public compareSyncPassword(plainTextPassword: string): boolean {
    if (this.isAlreadyHashed()) {
      return this.bcryptCompare(plainTextPassword, this.props.value);
    } else {
      return plainTextPassword === this.props.value;
    }
  }

  private bcryptCompare(plainText: string, hashed: string): boolean {
    return bcrypt.compareSync(plainText, hashed);
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise(resolve => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');
    if (propsResult.isFailure) {
      return Result.fail<UserPassword>(propsResult.errorValue());
    }

    if (!props.hashed) {
      if (!this.isAppropriateLength(props.value)) {
        return Result.fail<UserPassword>('Password doesnt meet criteria [8 chars min].');
      }
    }

    return Result.ok<UserPassword>(
      new UserPassword({
        value: props.value,
        hashed: props.hashed,
      }),
    );
  }
}
