import { abs, dot, Matrix, square, forEach } from "mathjs";

class StateVector {
  private m: Matrix;
  constructor(m: Matrix) {
    this.m = m;
  }

  // p(|x>) = |<this.m|x>|^2
  // For now Measure does not affect the actual state of the qubit like it does in a real QC
  Measure(value: Matrix): number {
    return square(abs(dot(this.m, value)));
  }

  AsMatrix(): Matrix {
    return this.m;
  }

  // ToASCII returns a string representing a prettified Matrix output
  // with proper padding.
  // Ex:
  //|0.7071067811865476|
  //|0.7071067811865476|
  //|                 0|
  //|                 0|
  ToASCII(): String {
    const matrix = this.m;
    let output = "\n|";

    let currRow = 0;

    let columnMaxes: { [col: number]: number } = {};

    // Find the longest value for each column so we can pad properly
    forEach(matrix, (value, index: any) => {
      const column = index[1];
      if (!columnMaxes[column]) {
        columnMaxes[column] = 0;
      }
      const length = value.toString().length;
      if (length > columnMaxes[column]) {
        columnMaxes[column] = length;
      }
    });

    // Append a new row of text per iteration
    forEach(matrix, (value, index) => {
      const padding = columnMaxes[index[1]] - value.toString().length;
      const spaced = new Array(padding + 1).join(" ") + value.toString();

      if (index[0] === currRow) {
        output = output.concat(spaced + ", ");
      } else {
        currRow = index[0];
        output = output.slice(0, -2);
        output = output.concat("|\n|" + spaced + ", ");
      }
    });
    output = output.slice(0, -2);
    output = output.concat("|");
    return output;
  }
}

export default StateVector;
