import { expect } from 'chai';

/*
You are planning production for an order.
You have a number of machines that each have a fixed number
of days to produce an item.
Given that all the machines operate simultaneously,
determine the minimum number of days to produce the required order.

For example, you have to produce goal = 10 items.
You have three machines that take _machines = [2, 3, 2]_ days to produce an item.
The following is a schedule of items produced:

Day Production  Count
2   2               2
3   1               3
4   2               5
6   3               8
8   2              10

It takes 8 days to produce 10 items using these machines.

Function Description

Complete the minimumTime function in the editor below. It should return an integer representing the minimum number of days required to complete the order.

minimumTime has the following parameter(s):

machines: an array of integers representing days to produce one item per machine
goal: an integer, the number of items required to complete the order
*/
function minimumTime(machines: number[], goal: number): number {
  const ratePerDay = machines.reduce((acc, m) => acc + 1 / m, 0);
  let minimumDays = Math.floor(goal / ratePerDay) - 1;
  const slowestMachine = machines.sort(compareNumbers)[machines.length - 1];
  let maximumDays = minimumDays + slowestMachine + 1;

  while (minimumDays < maximumDays - 1) {
    const days = Math.floor((minimumDays + maximumDays) / 2);
    const production = machines.reduce(
      (acc, m) => acc + Math.floor(days / m),
      0
    );
    if (production >= goal) maximumDays = days;
    else if (production < goal) minimumDays = days;
  }
  return maximumDays;
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

const testCases: [number[], number, number][] = [
  [[2, 3, 2], 10, 8],
  [[2, 3], 5, 6],
  [[1, 3, 4], 10, 7],
  [[4, 5, 6], 12, 20],
];

for (let [machines, goal, result] of testCases) {
  expect(minimumTime(machines, goal)).to.equal(result);
}
