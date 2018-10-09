function fizzBuzz(num) {
  if (num % 3 === 0) {
    if (num % 5 === 0) return "fizzbuzz";
    return "fizz";
  }
  if (num % 5 === 0) return "buzz";

  return num.toString();
}

module.exports = fizzBuzz;
