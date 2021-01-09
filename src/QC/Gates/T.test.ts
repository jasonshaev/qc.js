import { complex, exp, pi } from "mathjs";
import { new1 } from "../Constants";
import { QGate_T } from "./T";
import Qubit from "../Qubit";

test("basis 1", () => {
  const q = new1();
  const gate = new QGate_T();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  const e = exp(complex(0, pi / 4));
  expect(output.Alpha().equals(complex(0))).toBe(true);
  expect(output.Beta().equals(complex(e))).toBe(true);
});
