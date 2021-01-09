import { complex, identity, matrix } from "mathjs";
import StateVector from "./StateVector";

test("test toASCII: 2x2", () => {
  const sv = new StateVector(
    matrix([
      [1, 0],
      [0, 0],
    ])
  );
  const result = sv.ToASCII();
  expect(result).toBe("\n|1, 0|\n|0, 0|");
});

test("test toASCII: 3x3 identity", () => {
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const sv = new StateVector(identity(3));
  const result = sv.ToASCII();
  expect(result).toBe("\n|1, 0, 0|\n|0, 1, 0|\n|0, 0, 1|");
});

test("test toASCII:  complex", () => {
  const sv = new StateVector(
    matrix([
      //@ts-ignore Type 'Complex' is not assignable to type 'number'
      [complex(1, 1), 0],
      [0, 0],
    ])
  );
  const result = sv.ToASCII();
  expect(result).toBe("\n|1 + i, 0|\n|    0, 0|");
});
