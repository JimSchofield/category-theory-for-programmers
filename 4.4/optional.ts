type Optional<A> = [false] | [true, A];

type OptionalIdenty = <A>(x: A) => Optional<A>;

type OptionalCompose = <A, B, C>(
  f1: (x: A) => Optional<B>,
  f2: (y: B) => Optional<C>,
) => (x: A) => Optional<C>;

const optionalCompose: OptionalCompose =
  <A, B, C>(f1: (x: A) => Optional<B>, f2: (y: B) => Optional<C>) =>
  (x: A) => {
    const [res1, value1] = f1(x);

    if (!res1) {
      return [false] as Optional<C>;
    }

    const [res2, value2] = f2(value1);

    if (!res2) {
      return [false] as Optional<C>;
    }

    return [true, value2];
  };

const optionalIdentity: OptionalIdenty = <A>(x: A) => {
  return [true, x];
}

const sqrt = (x: number): Optional<number> => {
  if (x >= 0) {
    return [true, Math.sqrt(x)];
  }

  return [false]
}

const reciprocal = (x: number): Optional<number> => {
  if (x !== 0) {
    return [true, 1/x];
  }

  return [false];
}

const sqrtRecip = optionalCompose(sqrt, reciprocal);
const recipSqrt = optionalCompose(reciprocal, sqrt);

console.log(sqrtRecip(4))
console.log(sqrtRecip(0))
console.log(sqrtRecip(-1))

console.log(recipSqrt(1))
console.log(recipSqrt(0))
console.log(recipSqrt(-1))

const sqrtIdent = optionalCompose(sqrt, optionalIdentity);
const identSqrt = optionalCompose(optionalIdentity, sqrt);

console.log(sqrtIdent(-9));
console.log(sqrtIdent(9));

console.log(identSqrt(-9));
console.log(identSqrt(9));

