import { Matrix, matrix, multiply } from "mathjs";
import StateVector from "./StateVector";

class QGate {
  m: Matrix;

  constructor(m: Matrix = matrix()) {
    this.m = m;
  }

  Execute(q: StateVector): StateVector {
    const out = multiply(this.m, q.AsMatrix());
    const sv = new StateVector(out);

    const asString = printMatrixMultiplication(new StateVector(this.m), q, sv);

    console.log(`Executing:\n${asString}`);
    return sv;
  }

  AsMatrix(): Matrix {
    return this.m;
  }
}

// TODO: this probably doesn't belong here and could use a test.
// Return a formatted string representing a matrix multiplication.
// Ex:
//Executing:
//|1, 0, 0, 0||0.7071067811865476|   |0.7071067811865476|
//|0, 0, 0, 1||0.7071067811865476|   |                 0|
//|0, 0, 1, 0||                 0| = |                 0|
//|0, 1, 0, 0||                 0|   |0.7071067811865476|
function printMatrixMultiplication(
  leftInput: StateVector,
  rightInput: StateVector,
  result: StateVector
): String {
  const left = leftInput.ToASCII();
  const right = rightInput.ToASCII().slice(1);
  const linesLeft = left.split("\n");
  linesLeft.shift();
  const linesRight = right.split("\n");

  const linesOut = result.ToASCII().split("\n");
  linesOut.shift();

  let final = "";
  const equalsRow = Math.ceil(linesLeft.length / 2);
  for (let i = 0; i < linesLeft.length; i++) {
    const spacer = i === equalsRow ? " = " : "   ";
    final += linesLeft[i] + linesRight[i] + spacer + linesOut[i] + "\n";
  }
  return final;
}

export default QGate;
