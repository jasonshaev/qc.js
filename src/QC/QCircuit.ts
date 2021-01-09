import QCircuitElement from "./QCircuitElement";
import StateVector from "./StateVector";

import { matrix, size, index, subset, Complex } from "mathjs";
import Qubit from "./Qubit";
import QGate_Identity from "./Gates/Identity";

class QCircuit {
  // Circuit is represented as an array of arrays of circuit elements
  private circuit: Array<Array<QCircuitElement>>;

  // Number of steps in the circuit
  private steps: Number;
  private numInputs: Number;

  constructor(steps: Number, numInputs: Number) {
    this.steps = steps;
    this.circuit = [[]];
    this.numInputs = numInputs;
  }

  AddCE(ce: QCircuitElement) {
    const row = ce.GetRow();
    const step = ce.GetStep();
    if (!this.circuit[row]) {
      this.circuit[row] = [];
    }
    this.circuit[row][step] = ce;
  }

  GetCE(row: number, step: number): QCircuitElement {
    return this.circuit?.[row]?.[step];
  }

  initCircuit(qstate: Array<Qubit>) {
    // Add a dummy column of Identity gates, who's input is the initial state
    for (let row = 0; row < this.numInputs; row++) {
      const ce = new QCircuitElement(
        new QGate_Identity(),
        [this.GetCE(row, 1)],
        row,
        0
      );
      ce.AddInput(qstate[row]);
      this.AddCE(ce);
    }
  }

  Execute(initState: Array<Qubit>): Array<Qubit> {
    console.log(
      `Executing:
      steps: ${this.steps},
      numInputs: ${String(this.numInputs)},
      `
    );
    //Circuit: ${JSON.stringify(this.circuit, null, 2)}

    let qstate = initState;

    this.initCircuit(qstate);
    // Iterate over each step in the circuit
    for (let step = 0; step <= this.steps; step++) {
      // Iterate over gates looking for outputs
      const ces: Array<QCircuitElement> = [];
      for (let row = 0; row < this.numInputs; row++) {
        let ce = this.GetCE(row, step);
        if (!ce) {
          continue;
        }

        // If CE has inputs, add it to list of ces to get executed
        if (ce.GetInputs().length !== 0) {
          ces.push(ce);
        }
      }

      if (ces.length === 0) {
        continue;
      }

      const result: Array<Qubit> = [];

      ces.forEach((ce) => {
        // Build matrix
        const input: Array<Complex> = [];

        ce.GetInputs().forEach((i) => {
          input.push(i.Alpha());
          input.push(i.Beta());
        });

        // @ts-ignore: MathJS types don't currently allow creating a matrix from an array of Complex
        const sv = new StateVector(matrix(input));

        // HERE for fixing outputs for multi-input gate

        const matrixResult = ce.Gate().Execute(sv).AsMatrix();
        const sizeOfResult = subset(size(matrixResult), index(0));

        //TODO look at this one
        // @ts-ignore: Type 'Matrix | number[] | number[][]' is not assignable to type 'number[]'.
        const r = matrixResult.resize([sizeOfResult, 1]);

        // Slice result back into qubits
        // @ts-ignore: Even those sizeOfResult is a number in this context the types are assuming it's a matrix
        for (let i = 0; i < sizeOfResult; i += 2) {
          const ind = index(i, 0);
          const m = [[subset(r, ind)], [subset(r, index(i + 1, 0))]];
          //TODO check this one too
          // @ts-ignore: '(data: Matrix | number[] | number[][], format?: "sparse" | "dense" | undefined, dataType?: string | undefined): Matrix', gave the following error.
          const q = new Qubit(matrix(m));

          result.push(q);
          // Set qubit as input to it's output(s)
          ce.GetOutputs()[i]?.AddInput(q);
        }
      });

      qstate = result;
    }
    console.log("final qstate", JSON.stringify(qstate));

    return qstate;
  }
}

export default QCircuit;
