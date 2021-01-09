import QGate from "../QGate";
import { identity, Matrix } from "mathjs";

class QGate_Identity extends QGate {
    constructor() {
        super();
        this.m = identity(2) as Matrix;
    }
}

export default QGate_Identity