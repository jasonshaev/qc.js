import React from "react";
import "./App.css";
import QGate_Identity from "./QC/Gates/Identity";
import { new0 } from "./QC/Constants";
import QGate_Cx from "./QC/Gates/Cx";
import QCircuit from "./QC/QCircuit";
import QCircuitElement from "./QC/QCircuitElement";

function App() {
  const circuit = new QCircuit(2, 2);
  const cx = new QCircuitElement(new QGate_Cx(), [], 0, 2);
  circuit.AddCE(cx);

  const identity1 = new QCircuitElement(new QGate_Identity(), [cx], 0, 1);
  const identity2 = new QCircuitElement(new QGate_Identity(), [cx], 1, 1);

  circuit.AddCE(identity1);
  circuit.AddCE(identity2);

  const result = circuit.Execute([new0(), new0()]);
  return <div className="App"></div>;
}

export default App;
