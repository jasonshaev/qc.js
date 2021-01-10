import QGate from "./QGate";
import Qubit from "./Qubit";

// QCircuitElement contains a gate, and information about where the element
// exists in the topology of a circuit.
class QCircuitElement {
  private gate: QGate;
  outputs: Array<QCircuitElement>;
  row: number;
  step: number;
  inputs: Array<Qubit>;

  constructor(
    gate: QGate,
    //inputs: Array<QCircuitElement>,
    outputs: Array<QCircuitElement> = [],
    row: number,
    step: number,
    inputs: Array<Qubit> = []
  ) {
    this.gate = gate;
    this.outputs = outputs;
    this.row = row;
    this.step = step;
    this.inputs = inputs;
  }

  AddInput(input: Qubit) {
    this.inputs.push(input);
  }

  GetInputs(): Array<Qubit> {
    return this.inputs;
  }

  Gate(): QGate {
    return this.gate;
  }

  GetRow(): number {
    return this.row;
  }

  GetStep(): number {
    return this.step;
  }

  GetOutput(index: number): QCircuitElement {
    return this.outputs[index];
  }

  GetOutputs(): Array<QCircuitElement> {
    return this.outputs;
  }
}

export default QCircuitElement;
