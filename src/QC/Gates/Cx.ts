import QGate from "../QGate";
import { matrix } from "mathjs";

class QGate_Cx extends QGate {
  constructor() {
    super();
    // NOTE this representation can be different depending on the order
    this.m = matrix([
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
    ]);
  }
}

export default QGate_Cx;
