function* generator() {
  yield new Promise((res) => res(1));
  yield new Promise((res) => res(2));
  yield new Promise((res) => res(3));
  yield new Promise((res) => res(4));
}

const gen = generator();

async function test() {
  const { value, done } = gen.next();
  if (!done) {
    const v = await value;
    console.log(v);
    test();
  }
}

test();
