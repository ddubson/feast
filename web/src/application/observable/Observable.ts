export interface Observer {
}

export interface Observable<T extends Observer> {
  registerObserver(observer: T): void;

  unregisterObserver(observer: T): void;
}