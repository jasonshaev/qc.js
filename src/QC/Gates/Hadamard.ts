import QGate from "../QGate";
import { SQRT1_2, matrix } from "mathjs";

class QGate_Hadamard extends QGate {
    constructor() {
        super();
        this.m = matrix([[SQRT1_2, SQRT1_2], [SQRT1_2, -1 * SQRT1_2]])
    }
}

export default QGate_Hadamard;