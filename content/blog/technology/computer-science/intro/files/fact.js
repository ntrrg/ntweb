/**
 * Computes the factorial of the given number.
 *
 * @param {Number} n - Initial number.
 * @return {Number}
 */
function fact(n) {
  let r = 1

  while (n > 1)
    r *= n--

  return r
}
