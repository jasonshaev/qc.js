import { complex } from "mathjs";
import { new0, new1 } from "../Constants";

//const { default: Qubit } = require("../Qubit");
import Qubit from "../Qubit";
import { QGate_PauliX } from "./Pauli";

test("basis0 -> basis 1", () => {
  const q = new0();
  const gate = new QGate_PauliX();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  expect(output.Alpha().equals(complex(0))).toBe(true);
  expect(output.Beta().equals(complex(1))).toBe(true);
});

test("basis1 -> basis 0", () => {
  const q = new1();
  const gate = new QGate_PauliX();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  expect(output.Alpha().equals(complex(1))).toBe(true);
  expect(output.Beta().equals(complex(0))).toBe(true);
});
