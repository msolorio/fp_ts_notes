// By using ES Modules we can import types in import declarations
import { Option, none, some } from 'fp-ts/lib/Option';

function findIndex<A>(
  as: Array<A>,
  predicate: (a: A) => boolean
): Option<number> {
  const index = as.findIndex(predicate)
  return index === -1 ? none : some(index)
}

const myArr = ['orange', 'apple', 'banana'];

const result = findIndex(myArr, (item) => item === 'apple');

console.log('result ==>', result);
