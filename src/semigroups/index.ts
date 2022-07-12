/*
Semigroup
- A pair (A, *)
- in which A is a non-empty set
- and * is a binary associative operation on A
  - a function that takes two elements of A as input and returns an element of A as output...
*/

// The Semigroup type class
interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

// The concat operation can be used for merging, selection, addition, substitution

const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

///////////////////////////////////////////////////////////////
const semigroupArray: Semigroup<Array<number>> = {
  concat: (x, y) => x.concat(y)
}

function getArraySemigroup<A>(): Semigroup<Array<A>> {
  return {
    concat: (x, y) => x.concat(y)
  }
}

////////////////////////////////////////////////////////////////
type Point = {
  x: number
  y: number
}

const semigroupPoint: Semigroup<Point> = {
  concat: (p1, p2) => ({
    x: semigroupSum.concat(p1.x, p2.x),
    y: semigroupSum.concat(p1.y, p2.y)
  })
}

/////////////////////////////////////////////////////////////////
// Using a built in method to create a semigroup for a struct
import { getStructSemigroup } from 'fp-ts/lib/Semigroup'

const semigroupPoint2: Semigroup<Point> = getStructSemigroup({
  x: semigroupSum,
  y: semigroupSum
})

const point1 = semigroupPoint2.concat(
  {x: 1, y: 1},
  {x: 2, y: 2}
)

// console.log('point1 ==>', point1)

type Vector = {
  from: Point
  to: Point
}

const semigroupVector: Semigroup<Vector> = getStructSemigroup({
  from: semigroupPoint2,
  to: semigroupPoint2
})

////////////////////////////////////////////////////////////////
// Using semigroup to combine functions

import { getFunctionSemigroup, semigroupAll } from 'fp-ts/lib/Semigroup'

const semigroupPredicate: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(semigroupAll)<Point>()

const isPositiveX = (p: Point): boolean => p.x >= 0
const isPositiveY = (p: Point): boolean => p.y >= 0

const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY)

const result2 = isPositiveXY({x: 1, y: 1})

console.log('result2 ==>', result2)

/////////////////////////////////////////////////////////////////
// fold - Combining more than 2 elements

import { fold } from 'fp-ts/lib/Semigroup'

const getSum = fold(semigroupSum)

const result3 = getSum(0, [1, 2, 3, 4]) // 10

console.log('result3 ==>', result3)

//////////////////////////////////////////////////////////////////
const getProduct = fold(semigroupProduct)

const result4 = getProduct(1, [1, 2, 3, 4])

console.log('result4 ==>', result4)

//////////////////////////////////////////////////////////////////
// Applying Semigroups to combine Options

import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'

const S = getApplySemigroup(semigroupSum)

S.concat(some(1), none) // none
S.concat(some(1), some(2)) // some(3)

