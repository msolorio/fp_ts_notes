import { Either, tryCatch } from 'fp-ts/lib/Either'

function parse(s: string): Either<Error, unknown> {
  return tryCatch(
    () => JSON.parse(s),
    (reason) => new Error(String(reason))
  )
}

const result = parse('{ "someProp": "someVal"')

console.log('result ==>', result)

console.log('after the error')
