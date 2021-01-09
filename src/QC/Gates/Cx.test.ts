import { complex, deepEqual, kron, matrix, SQRT1_2 } from "mathjs";
import { new0, newMinus, newPlus } from "../Constants";
import QGate_Cx from "./Cx";
import StateVector from "../StateVector";

let cx = new QGate_Cx();
beforeEach(() => {
  cx = new QGate_Cx();
});

test("|0+>", () => {
  const control = new0();
  const target = newPlus();

  const q1q2 = new StateVector(
    kron(control.StateVector().AsMatrix(), target.StateVector().AsMatrix())
  );

  const output = cx.Execute(q1q2);

  // bell state
  //@ts-ignore Type 'Complex' is not assignable to type 'number'
  const expected = matrix([[complex(SQRT1_2)], [0], [0], [SQRT1_2]]);
  expect(deepEqual(expected, output.AsMatrix())).toBe(true);
});

test("|++> => |++>", () => {
  const control = newPlus();
  const target = newPlus();

  const q1q2 = new StateVector(
    kron(control.StateVector().AsMatrix(), target.StateVector().AsMatrix())
  );

  const output = cx.Execute(q1q2);

  // no change
  expect(deepEqual(q1q2.AsMatrix(), output.AsMatrix())).toBe(true);
});

test("|-+> => |-->", () => {
  const control = newMinus();
  const target = newPlus();

  const q1q2 = new StateVector(
    kron(control.StateVector().AsMatrix(), target.StateVector().AsMatrix())
  );

  const output = cx.Execute(q1q2);

  const expected = kron(
    newMinus().StateVector().AsMatrix(),
    newMinus().StateVector().AsMatrix()
  );
  expect(deepEqual(expected, output.AsMatrix())).toBe(true);
});
