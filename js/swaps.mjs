function increment(n) {
  n += 1;
}

let num = 0;
increment(num);
console.log(num); // 0

// primitives are passed by value (strings and numbers)
// objects and arrays are passed by reference

function incrementObject(o) {
  o.n += 1;
}

let obj = { n: 0 };
incrementObject(obj);
console.log(obj.n); // 1
