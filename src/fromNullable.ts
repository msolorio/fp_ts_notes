import { Option, fromNullable } from 'fp-ts/lib/Option';

function find<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate))
}

const myArr = ['orange', 'apple', 'plum']

const result = find(myArr, (fruit) => fruit === 'apple')

// Result is either an instance of Some<A> | None - both are type Option<A>
console.log('result ==>', result)
