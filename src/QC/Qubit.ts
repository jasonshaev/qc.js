import {
  Complex,
  Matrix,
  subset,
  index,
  abs,
  square,
  sqrt,
  add,
  divide,
} from "mathjs";
import { new0, new1 } from "./Constants";
import StateVector from "./StateVector";

class Qubit {
  stateVector: StateVector;
  constructor(m: Matrix) {
    this.stateVector = new StateVector(m);
  }

  Mag(): number {
    const squareA = square(abs(this.Alpha()));
    const squareB = square(abs(this.Beta()));
    const s = add(squareA, squareB) as Complex;
    return Number(sqrt(s));
  }

  // Scalar value times |0>
  Alpha(): Complex {
    // @ts-ignore: TS thinks this returns a Matrix
    return subset(this.stateVector.AsMatrix(), index(0, 0));
  }

  // Scalar value times |1>
  Beta(): Complex {
    // @ts-ignore: TS thinks this returns a Matrix
    return subset(this.stateVector.AsMatrix(), index(1, 0));
  }

  StateVector(): StateVector {
    return this.stateVector;
  }

  // p(|x>) = |<this.m|x>|^2
  // For now Measure does not affect the actual state of the qubit like it does in a real QC
  Measure(value: Matrix): number {
    return this.stateVector.Measure(value);
  }

  Collapse(): StateVector {
    // TODO normalize
    const mag = this.Mag();
    const alpha2 = divide(this.Alpha(), mag);
    const rand = Math.random();
    if (rand <= alpha2) {
      return new0().StateVector();
    }
    return new1().StateVector();
  }
}

export default Qubit;
