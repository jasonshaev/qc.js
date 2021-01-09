import Qubit from "./Qubit";
import { matrix, complex, SQRT1_2, equal, deepEqual } from "mathjs";
import { basis_0, basis_1 } from "./Constants";

test("measure: input = basis_0", () => {
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const m = matrix([[complex(SQRT1_2)], [complex(0, SQRT1_2)]]);
  const input = new Qubit(m);
  const t = input.Measure(basis_0);

  expect(t).toBeCloseTo(0.5);
});

test("measure: input = basis_1", () => {
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const m = matrix([[complex(SQRT1_2)], [complex(0, SQRT1_2)]]);
  const input = new Qubit(m);
  const t = input.Measure(basis_1);

  expect(t).toBeCloseTo(0.5);
});

test("collapse", () => {
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const m = matrix([[complex(SQRT1_2)], [complex(0, SQRT1_2)]]);
  const input = new Qubit(m);
  const collapsed = input.Collapse();
  expect(deepEqual(collapsed.AsMatrix(), basis_0)).toBe(true);
});

test("collapse 10 times", () => {
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const m = matrix([[complex(SQRT1_2)], [complex(0, SQRT1_2)]]);
  const input = new Qubit(m);
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push(input.Collapse());
  }
  for (let i = 0; i < 10; i++) {
    const expected = i % 2 === 0 ? basis_0 : basis_1;
    expect(deepEqual(results[i].AsMatrix(), expected)).toBe(true);
  }
});

test("random spy", () => {
  const r1 = Math.random();
  const r2 = Math.random();
  expect(r1).toBe(0);
  expect(r2).toBe(1);
});

// Override random number generator so it is deterministic for the duration of the unit tests
beforeEach(() => {
  const r = jest.spyOn(global.Math, "random");
  let x = 0;
  r.mockImplementation(() => {
    const r = x % 2 === 0 ? 0 : 1;
    x++;
    return r;
  });
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});
