import { deepEqual, matrix } from "mathjs";
import { new0 } from "./Constants";
import QGate_Cx from "./Gates/Cx";
import QGate_Hadamard from "./Gates/Hadamard";
import QGate_Identity from "./Gates/Identity";
import QCircuit from "./QCircuit";
import QCircuitElement from "./QCircuitElement";

test("add circuit element to index", () => {
  const circuit = new QCircuit(1, 1);
  const ce = new QCircuitElement(new QGate_Hadamard(), [], 0, 1);
  circuit.AddCE(ce);

  const ce2 = circuit.GetCE(0, 1);
  expect(ce2).toEqual(ce);
});

test("2 inputs, 1 Step identity", () => {
  const circuit = new QCircuit(1, 2);

  const identity1 = new QCircuitElement(new QGate_Identity(), [], 0, 1);
  const identity2 = new QCircuitElement(new QGate_Identity(), [], 1, 1);

  circuit.AddCE(identity1);
  circuit.AddCE(identity2);

  const result = circuit.Execute([new0(), new0()]);

  expect(
    deepEqual(
      result[0].StateVector().AsMatrix(),
      new0().StateVector().AsMatrix()
    )
  ).toBe(true);
});

test("2 inputs, 2 Step CX", () => {
  const circuit = new QCircuit(2, 2);

  // TODO fix having to give row/step twice
  const cx = new QCircuitElement(new QGate_Cx(), [], 0, 2);
  circuit.AddCE(cx);

  const identity1 = new QCircuitElement(new QGate_Identity(), [cx], 0, 1);
  const identity2 = new QCircuitElement(new QGate_Identity(), [cx], 1, 1);

  circuit.AddCE(identity1);
  circuit.AddCE(identity2);

  const result = circuit.Execute([new0(), new0()]);

  expect(
    deepEqual(
      result[0].StateVector().AsMatrix(),
      new0().StateVector().AsMatrix()
    )
  ).toBe(true);
});

// bell pair?
test("2 inputs, 2 Step H, CX", () => {
  const circuit = new QCircuit(2, 2);

  const cx = new QCircuitElement(new QGate_Cx(), [], 0, 2);
  circuit.AddCE(cx);

  const h1 = new QCircuitElement(new QGate_Hadamard(), [cx], 0, 1);
  const identity2 = new QCircuitElement(new QGate_Identity(), [cx], 1, 1);

  circuit.AddCE(h1);
  circuit.AddCE(identity2);

  const result = circuit.Execute([new0(), new0()]);

  const r1 = result[0];
  for (let i = 0; i < 10; i++) {
    const sv = r1.Collapse();
    const expected = matrix([[1], [0]]);

    expect(deepEqual(sv.AsMatrix(), expected)).toBe(true);
  }

  const r2 = result[1];
  for (let i = 0; i < 10; i++) {
    const sv = r2.Collapse();
    const expected = i % 2 === 0 ? matrix([[1], [0]]) : matrix([[0], [1]]);

    expect(deepEqual(sv.AsMatrix(), expected)).toBe(true);
  }
});

// TODO make this not copy pasta from qubit.tests.ts
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
