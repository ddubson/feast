export interface Observer {
}

interface Observable<T extends Observer> {
  registerObserver(observer: T): void;

  unregisterObserver(observer: T): void;
}

export abstract class AbstractObservable<T> implements Observable<T> {
  protected readonly observers: T[] = [];

  public registerObserver(observer: T): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: T): void {
    const start = this.observers.findIndex((searchElement: T) => searchElement === observer);
    this.observers.splice(start, 1);
  }
}
