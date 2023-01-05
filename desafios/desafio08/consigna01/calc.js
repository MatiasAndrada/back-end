var assert = require("assert");

const division = (a, b) => {

   //if ( (a !== 0 && !a) || (b !== 0 && !b))return "parametros invalidos"
   
  if (b === 0) {
    if (a === 0) return "indetermidado";
    return "error";
  }
  if (a === 0) return 0;
  if ( (a !== 0 && !a) ||!b)return "parametros invalidos"
  return a / b;
};

assert(division(4, 2) === 2);
assert(division(4, 0) === "error");
assert(division(0, 0) === "indeterminado");
assert(division(2, 8) === 0.25);
assert(division(0, 1) === 0);
assert(division() === "parametros invalidos");
assert(division(1, "") === "parametros invalidos");
