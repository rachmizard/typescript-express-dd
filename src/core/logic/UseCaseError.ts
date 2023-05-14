interface IUseCaseErrorError {
  message: string;
}

export abstract class UseCaseError implements IUseCaseErrorError {
  public readonly message: string;
  public readonly code?: number;

  constructor(message: string, code = 500) {
    this.message = message;
    this.code = code;
  }
}
