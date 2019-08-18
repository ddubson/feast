export interface Repository<T> {
  fetchAll(): T[];
  findById(id: string): T | undefined;
  save(t: T): T;
}
