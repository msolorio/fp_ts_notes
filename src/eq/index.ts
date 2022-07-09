
interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

// checks for equality of 2 nums
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

// (Eq<A>) -> (A, Array<A>) -> boolean
// returns a function that checks if an item exists in an array
function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a))
}

// checks if number exists in array
const result1 = elem(eqNumber)(1, [1, 2, 3]) // => true
const result2 = elem(eqNumber)(4, [1, 2, 3]) // => false

// console.log('result1 ==>', result1)
// console.log('result2 ==>', result2)

/////////////////////////////////////////////////////////////////
type Point = {
  x: number
  y: number
}

const eqPoint: Eq<Point> = {
  equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y
}

// Can optimize by first checking for referenced equality - if both points are references of the same point
const eqPoint2: Eq<Point> = {
  equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.y === p2.y)
}

//////////////////////////////////////////////////////////////////
import { getStructEq } from 'fp-ts/lib/Eq';

// An interface holding a function that checks for equality of 2 points.
const eqPoint3: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
})

// checks if point exists in an array of points.
const result3 = elem(eqPoint3)({x: 2, y: 1}, [{x: 2, y: 1}])
const result4 = elem(eqPoint3)({x: 2, y: 1}, [{x: 2, y: 2}])

// console.log('result3 ==>', result3)
// console.log('result4 ==>', result4)

/////////////////////////////////////////////////////////////////
type Vector = {
  from: Point
  to: Point
}

// An interface holding a function that checks for equality of 2 vectors.
const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
})

//////////////////////////////////////////////////////////////////
import { getEq } from 'fp-ts/lib/Array';

// returns an interface holding a function that checks for equality of 2 Array<Point>'s
const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)

/////////////////////////////////////////////////////////////////
import { contramap } from 'fp-ts/lib/Eq'

type User = {
  userId: number
  name: string
}

// returns interface holding a function that checks if 2 users have equal userIds
const eqUser: Eq<User> = contramap((user: User) => user.userId)(eqNumber)

const result5 = eqUser.equals({ userId: 1, name: 'Sam' }, { userId: 1, name: 'Samuel' })

// console.log('result5 ==>', result5)
