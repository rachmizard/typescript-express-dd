export interface Usecase<T = any, R = any> {
  execute(arg?: T): Promise<R> | R;
  execute(...args: T[]): Promise<R> | R;
}
