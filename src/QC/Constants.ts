import { matrix, complex, SQRT1_2 } from "mathjs";
import Qubit from "./Qubit";

// @ts-ignore: Type 'Complex & Matrix' is not assignable to type 'number'.
export const basis_0 = matrix([[complex(1)], [complex(0)]]);
// @ts-ignore: Type 'Complex & number[]' is not assignable to type 'number'.
export const basis_1 = matrix([[complex(0)], [complex(1)]]);

export const new0 = () => {
  return new Qubit(basis_0);
};

export const new1 = () => {
  return new Qubit(basis_1);
};

// |+>
export const newPlus = () => {
  return new Qubit(matrix([[SQRT1_2], [SQRT1_2]]));
};

// |->
export const newMinus = () => {
  return new Qubit(matrix([[SQRT1_2], [-1 * SQRT1_2]]));
};
