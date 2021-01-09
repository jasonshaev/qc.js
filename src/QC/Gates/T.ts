import QGate from "../QGate";
import { matrix, exp, complex, pi } from "mathjs";

export class QGate_T extends QGate {
  constructor() {
    super();
    this.m = matrix([
      [1, 0],
      // @ts-ignore: Type 'Complex' is not assignable to type 'number'.
      [0, exp(complex(0, pi / 4))],
    ]);
  }
}
