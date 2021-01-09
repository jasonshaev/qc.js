import QGate_Hadamard from "./Hadamard";
import { SQRT1_2, complex } from "mathjs";
import Qubit from "../Qubit";
import { new0, new1 } from "../Constants";

let gate = new QGate_Hadamard();
beforeEach(() => {
  gate = new QGate_Hadamard();
});

test("zero basis state matrix multiplies to right value", () => {
  // zero basis state
  const q = new0();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  expect(output.Alpha().equals(complex(SQRT1_2))).toBe(true);
  expect(output.Beta().equals(complex(SQRT1_2))).toBe(true);
});

test("one basis state matrix multiplies to right value", () => {
  // one basis state
  const q = new1();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  expect(output.Alpha().equals(complex(SQRT1_2))).toBe(true);
  expect(output.Beta().equals(complex(-1 * SQRT1_2))).toBe(true);
});

test("reversible same gate", () => {
  const q = new1();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  const o2 = new Qubit(gate.Execute(output.StateVector()).AsMatrix());
  expect(o2.Alpha().equals(complex(0))).toBe(true);

  // Floating point rounding
  expect(o2.Beta().re).toBeCloseTo(1);
});

test("reversible new gate", () => {
  const q = new1();
  const gate2 = new QGate_Hadamard();
  const output = new Qubit(gate.Execute(q.StateVector()).AsMatrix());
  const o2 = new Qubit(gate2.Execute(output.StateVector()).AsMatrix());
  expect(o2.Alpha().equals(complex(0))).toBe(true);

  // Floating point rounding
  expect(o2.Beta().re).toBeCloseTo(1);
});
