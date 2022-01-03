import { expect } from 'chai';
import { intersection } from './intersection.mjs';

function testIntersection(a, b, expected) {
  if (expected === null) {
    expect(
      intersection({ start: a[0], end: a[1] }, { start: b[0], end: b[1] })
    ).equal(null);
  } else {
    expect(
      intersection({ start: a[0], end: a[1] }, { start: b[0], end: b[1] })
    ).deep.equal({ start: expected[0], end: expected[1] });
  }
}

testIntersection([0, 0], [0, 0], [0, 0]);
testIntersection([0, 1], [2, 3], null); // no intersection left
testIntersection([2, 3], [4, 5], null); // no intersection right
testIntersection([0, 10], [2, 3], [2, 3]); // inside
testIntersection([0, 10], [2, 13], [2, 10]); // overlapping right
testIntersection([10, 20], [2, 13], [10, 13]); // overlapping left
testIntersection([10, 20], [2, 23], [10, 20]); // overlapping both
testIntersection([10, 20], [10, 20], [10, 20]); // same
