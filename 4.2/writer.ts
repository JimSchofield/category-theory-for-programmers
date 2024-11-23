type Writer<A> = [A, string];

type WriterIdentity = <A>(x: A) => Writer<A>;

type WriterCompose = <A, B, C>(
  f1: (x: A) => Writer<B>,
  f2: (y: B) => Writer<C>,
) => (x: A) => Writer<C>;

const writerCompose: WriterCompose =
  <A, B, C>(f1: (x: A) => Writer<B>, f2: (y: B) => Writer<C>) =>
  (x: A) => {
    const [res1, write1] = f1(x);
    const [res2, write2] = f2(res1);
    return [res2, write1 + write2] as Writer<C>;
  };

const identity: WriterIdentity = <A>(x: A) => [x, ""];

//////////////////

const f1 = (x: string): Writer<string> => [
  Array.from(x)
    .map((str) => str.toUpperCase())
    .join(""),
  "ToUpper"
];

const f2 = (x: string): Writer<string[]> => [x.split(" "), "ToWords"];

const composed = writerCompose(f1, f2);

const composedWithIdentity = writerCompose(f1, identity);

// Interesting that typescript doesn't look ahead and infer at this point
const composedWithIdentity2 = writerCompose(identity, f1);

console.log(composed("This is a string"));

console.log(f1("This is a string"));
console.log(composedWithIdentity("This is a string"));
console.log(composedWithIdentity2("This is a string"));


