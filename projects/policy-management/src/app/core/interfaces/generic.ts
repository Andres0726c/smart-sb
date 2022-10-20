export interface GenerictId<T> {
  id: number;
  code: T;
}

export interface Generict<T> extends GenerictId<T> {
  name: string;
  description: string;
}


