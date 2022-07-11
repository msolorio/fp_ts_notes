import { Ord, fromCompare } from 'fp-ts/lib/Ord';
// import { Ordering } from 'fp-ts/lib/Ordering'

const ordNumber: Ord<number> = fromCompare((x, y) => x < y ? -1 : x > y ? 1 : 0);

ordNumber.compare(1, -5) // => -1 | 1 | 0

function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => O.compare(x, y) === 1 ? y : x;
}

/////////////////////////////////////////////////////////////////////

type User = {
  name: string,
  age: number
}

const ordUserByAge: Ord<User> = fromCompare((x, y) => ordNumber.compare(x.age, y.age));

const result = ordUserByAge.compare(
  {name: 'A', age: 34},
  {name: 'B', age: 33}
);

// console.log('result ==>', result)

///////////////////////////////////////////////////////////////////////
// can use contramap to derive a compare function, comparing 2 users by age.

import { contramap } from 'fp-ts/lib/Ord'

const byAge: Ord<User> = contramap((user: User) => user.age)(ordNumber);

const result2 = byAge.compare({name: 'A', age: 45}, {name: 'B', age: 46}); // => 1 | -1 | 0

// console.log('result2 ==>', result2)

/////////////////////////////////////////////////////////////////////////
// Combining with `min`
const getYounger = min(byAge)

const youngerUser = getYounger({ name: 'Guido', age: 48 }, { name: 'Steve', age: 47 });

// console.log('youngerUser ==>', youngerUser);

/////////////////////////////////////////////////////////////////////////
// Use getDualOrd to derive opposite function - derive max function from min

import { getDualOrd } from 'fp-ts/lib/Ord'

function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return min(getDualOrd(O))
}

const getOlder = max(byAge)

const olderUser = getOlder({ name: 'Guido', age: 48}, { name: 'Tammy', age: 49 });

console.log('olderUser ==>', olderUser)


