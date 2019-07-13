export interface Repository<T> {
  fetchAll(): T[];
  findById(id: number): T;
}
