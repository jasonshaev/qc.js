import QGate from "../QGate";
import { matrix } from "mathjs";

export class QGate_PauliX extends QGate {
    constructor() {
        super();
        this.m = matrix([[0, 1], [1, 0]]);
    }
}

