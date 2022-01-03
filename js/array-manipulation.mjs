export function arrayManipulation(n, queries) {
  const arr = Array(n).fill(0);
  for (let [a, b, k] of queries) {
    arr[a - 1] += k;
    if (b < arr.length) arr[b] -= k;
  }
  let max = 0;
  let acc = 0;
  for (let i = 0; i < arr.length; i++) {
    acc += arr[i];
    if (acc > max) max = acc;
  }
  return max;
}
