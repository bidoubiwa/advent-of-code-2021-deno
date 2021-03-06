abstract class Iterator<T> {
  abstract next(): T | null;

  collect() {
    return this.fold<T[]>((acc, curr) => {
      acc.push(curr);
      return acc;
    }, []);
  }

  fold<P>(f: (acc: P, curr: T) => P, init: P): P {
    let elem = this.next();
    let acc = init;
    while (elem !== null) {
      acc = f(acc, elem);
      elem = this.next();
    }
    return acc;
  }

  foldFirst(
    f: (acc: T, curr: T) => T,
  ): T | null {
    let acc = this.next();
    let elem = this.next();

    while (elem !== null && acc !== null) {
      acc = f(acc, elem);
      elem = this.next();
    }
    return acc;
  }

  map(f: (elem: T) => number): IterMapNumber<T> {
    return new IterMapNumber(this, f);
  }
}

export abstract class NumberIterator extends Iterator<number> {
  sum() {
    return this.foldFirst((acc, curr) => acc + curr);
  }

  product() {
    return this.foldFirst((acc, curr) => acc * curr);
  }

  min() {
    return this.foldFirst((acc, curr) => Math.min(acc, curr));
  }

  max() {
    return this.foldFirst((acc, curr) => Math.max(acc, curr));
  }

  filter(f: (elem: number) => boolean): IterFilterNumber {
    return new IterFilterNumber(this, f);
  }
}

export class IterArrayMut extends NumberIterator {
  elem: number[];

  constructor(elem: number[]) {
    super();
    this.elem = elem;
  }
  next() {
    if (this.elem.length === 0) return null;
    return this.elem.splice(0, 1)[0];
  }
}

export class RangeIter extends NumberIterator {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    super();
    this.start = start;
    this.end = end;
  }
  next() {
    if (this.start === this.end) return null;
    const tmp = this.start;
    if (this.end < this.start) this.start = this.start - 1;
    else {
      this.start = this.start + 1;
    }
    return tmp;
  }
}

export class IterMapNumber<T> extends NumberIterator {
  iterator: Iterator<T>;
  mapper: (elem: T) => number;

  constructor(iterator: Iterator<T>, mapper: (elem: T) => number) {
    super();
    this.iterator = iterator;
    this.mapper = mapper;
  }
  next() {
    let elem = this.iterator.next();
    if (elem == null) return null;
    return this.mapper(elem);
  }
}

export class IterFilterNumber extends NumberIterator {
  iterator: Iterator<number>;
  predicat: (elem: number) => boolean;

  constructor(iterator: Iterator<number>, predicat: (elem: number) => boolean) {
    super();
    this.iterator = iterator;
    this.predicat = predicat;
  }

  next() {
    while (true) {
      let elem = this.iterator.next();
      if (elem == null) return null;
      if (!!this.predicat(elem)) return elem;
    }
  }
}

export function windowGen(sequence: string[], splitSize: number) {
  return () => {
    if (sequence.length === 0) return [];
    return sequence.splice(0, splitSize);
  };
}

export function nextBin(hexas: string[], nbrHex: number) {
  return () => {
    if (hexas.length === 0) return null;
    const nextBin = hexas.splice(0, nbrHex).join('');
    return parseInt(nextBin, 16).toString(2).padStart(4, '0');
  };
}

export function join(next: () => string | null) {
  let joined = '';
  let nextBin = next();
  while (nextBin !== null) {
    joined += nextBin;
    nextBin = next();
  }
  return joined;
}

export type Fold<P, T> = (acc: P, curr: T) => P;

export type IterType = {
  next(): number | null;
  sum(): number | null;
  product(): number | null;
  collect(): number[];
  min(): number | null;
  max(): number | null;
  fold: <P>(acc: Fold<P, number>, init: P) => P;
  foldFirst: (acc: Fold<number, number>) => number | null;
};

export function LiterValues(arr: number[]): IterType {
  return {
    next: function () {
      if (arr.length === 0) return null;
      return arr.splice(0, 1)[0];
    },
    sum: function () {
      return this.foldFirst((acc, curr) => acc + curr);
    },
    product: function () {
      return this.foldFirst((acc, curr) => acc * curr);
    },
    min: function () {
      return this.foldFirst((acc, curr) => Math.min(acc, curr));
    },
    max: function () {
      return this.foldFirst((acc, curr) => Math.max(acc, curr));
    },
    collect: function () {
      return this.fold<number[]>((acc, curr) => {
        acc.push(curr);
        return acc;
      }, []);
    },
    fold: function <T>(f: (acc: T, curr: number) => T, init: T): T {
      let elem = this.next();
      let acc = init;
      while (elem !== null) {
        acc = f(acc, elem);
        elem = this.next();
      }
      return acc;
    },
    foldFirst: function (
      f: (acc: number, curr: number) => number,
    ): number | null {
      let acc = this.next();
      let elem = this.next();

      while (elem !== null && acc !== null) {
        acc = f(acc, elem);
        elem = this.next();
      }
      return acc;
    },
  };
}
