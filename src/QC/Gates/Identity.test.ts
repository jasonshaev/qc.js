import QGate_Identity from "./Identity";
import { complex } from "mathjs";
import { new0 } from "../Constants";

import Qubit from "../Qubit";

test("horizontal matrix multiplies to right value", () => {
  const q = new0();
  const gate = new QGate_Identity();
  const o = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  expect(o.Alpha().equals(complex(1))).toBe(true);
  expect(o.Beta().equals(complex(0))).toBe(true);
});
