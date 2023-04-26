import { expect } from 'chai';
import { Dequeue } from '../src/Dequeue';

/*
818. Race Car
Hard
1.7K
166
company
Google
company
Amazon
company
Microsoft
Your car starts at position 0 and speed +1 on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions 'A' (accelerate) and 'R' (reverse):

When you get an instruction 'A', your car does the following:
position += speed
speed *= 2

When you get an instruction 'R', your car does the following:
If your speed is positive then speed = -1
otherwise speed = 1
Your position stays the same.

For example, after commands "AAR", your car goes to positions 0 --> 1 --> 3 --> 3, and your speed goes to 1 --> 2 --> 4 --> -1.

Given a target position target, return the length of the shortest sequence of instructions to get there.

 
Constraints:

1 <= target <= 104

## Approach

  target = 3

            0,1  // position, speed
       ┌A────┴────R┐
      1,2         0,-1
    ┌A─┴─R┐     ┌A─┴─R┐
   3,4   1,-1 -1,-2  0,1


We can perform a breadth first search to find the shortest sequence of instructions to reach the target. However this will run in O(2^n) where n = target number. 
Caching could improve that, but this approach involves a ton of unnecessary work. In the example above the entire right portion of the tree could be skipped because we know intuitively that we probably don't want to reach the target quickly by starting off in reverse.

We probably want to start by accelerating for as long as possible until we get as close as possible to target. This is a sub-problem that looks like this:

Given:

  position += speed
  speed *= 2

  pos, speed  instructions
  0, 1  ""
  1, 2  A
  3, 4  AA
  7, 8  AAA
  15, 16  AAAA

We can express the position in terms of the number of instructions (i) (while accelerating):

  pos = 2^i - 1

so if we know the target position, we can solve for i:

  15 = 2^i - 1
 + 1       + 1

 log2(16) = i = 4

  i = log2(target + 1)

Now since we can't apply "partial" instructions, we will have one of three scenarios:

  1. Round the answer down, and we will be before the target.
     We will then have to append two reverse instructions to "reset" our speed, then recursively call ourselves to finish the remaining distance.

  Example: target = 16
  const i = Math.log2(target + 1) = 4.087...
  
  So our instruction set so far is "AAAA" which gets us to 15. 
  We have to "reset" our speed, so we append two reverse: "AAAARR"
  and recurse the remainder, plus 2.

  target = 1 (16 - 15) which will return 1, for a total of 7 instructions.


  2. We got lucky and the answer is an integer. We have arrived exactly at the target and can just return.

  3. We round the answer up, and overshoot the target.
     We then have to append a single reverse instruction, to "face" backwards towards the target, and then recursively call ourselves to finish remaining distance (in reverse). ??

Unfortunately, the above algorithm doesn't always find the most optimal solution, because in some cases, the shortest instuction set can involve starting by moving away from the target!

For example: target = 5

The above floor/ceil approach would produce the following instruction sets:

  floor: AARRARRA (length 8)
          3  4  5

  ceil: AAARAARA (length 8)
          7  4 5

But the target can be reached in 7 instructions:
 
  optimal: AA RA RAA
            3  2   5

                                 █     ▄
                           █  ▄  █  ▄  █
            ▄  █  ▄     █  █  █  █  █  █  █  
      █     █  █  █  ▄  █  █  █  █  █  █  █  █
   ▄  █  █  █  █  █  █  █  █  █  █  █  █  █  █
0, 1, 4, 2, 5, 7, 5, 3, 6, 8, 7, 10,7, 9, 6, 4
1  2     4           8                        16


### Mirror approach idea

So the floor/ceil approach calculates how to accelerate continuously (exponentially) to a point before and after the target:

pos  speed instructions
  0, 1  ""
  1, 2  A
  3, 4  AA
  7, 8  AAA
  15, 16  AAAA

          target
            ↓
  0 1 2 3 4 5 6 7
  │     ↑       ↑
  └─┘───┘───────┘  
        floor   ceil

  optimal: AA RA RAA (zig zag)
            3  2   5

mirror (backwards):

                target
                  ↓
  -2 -1 0 1 2 3 4 5 6 7
   ↑        ↑     │
   └────────└───└─┘  
   floor    ceil

 
mid:

                  target
                    ↓
  0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
  │             ↑                    ↑
  └─┘───┘───────┘────────────────────┘
                floor             ceil

racecar(2) = AARA

Optimal Solutions:

{ target: 0, instructions: '' }
{ target: 1, instructions: 'A' }
{ target: 3, instructions: 'AA' }
{ target: 7, instructions: 'AAA' }
{ target: 15, instructions: 'AAAA' }
{ target: 8, instructions: 'AAARRA' }
{ target: 9, instructions: 'AAARARAA' }
{ target: 10, instructions: 'AAARRAA' }
{ target: 11, instructions: 'AAAARAARRA' }
{ target: 12, instructions: 'AAAARAA' }
{ target: 13, instructions: 'AAAARAARA' }
{ target: 14, instructions: 'AAAARA' }
{ target: 5, instructions: 'AARARAA' }
{ target: 9, instructions: 'AAARARAA' }

*/

// BFS/Greedy approach
// function racecar(target: number): number {
//   const queue = new Dequeue<[number, number, number, string]>();
//   queue.push([0, 1, 0, '']);
//
//   while (queue.size()) {
//     const [pos, speed, n, instructions] = queue.shift()!;
//
//     if (pos === target) {
//       console.log({ target, instructions });
//       return n;
//     }
//
//     // Accelerate
//     queue.push([pos + speed, speed * 2, n + 1, instructions + 'A']);
//
//     // Reverse
//     if (speed > 0) {
//       if (pos + speed > target) {
//         queue.push([pos, -1, n + 1, instructions + 'R']);
//       }
//     } else {
//       if (pos + speed < target) {
//         queue.push([pos, 1, n + 1, instructions + 'R']);
//       }
//     }
//   }
//
//   return 0;
// }

// const results: number[] = [];
// for (let t = 0; t < 16; t++) {
//   results.push(racecar(t));
// }
// console.log(results);

// Floor/ceiling approach
function racecar(target: number): number {
  const i = Math.log2(target + 1);

  // pos = 2^i - 1
  const floor = Math.floor(i);
  const floorPos = Math.pow(2, floor) - 1;
  if (floorPos === target) return floor;

  const ceil = Math.ceil(i);
  const ceilPos = Math.pow(2, ceil) - 1;
  return Math.min(
    floor + 2 + racecar(target - floorPos),
    ceil + 1 + racecar(ceilPos - target)
  );
}

// BFS solution (no cache)
// function racecar(target: number): number {
//   const queue = [[0, 1, 0]];
//   while (queue.length > 0) {
//     const [position, speed, steps] = queue.shift() as number[];
//     if (position === target) return steps;
//
//     const accelerate = [position + speed, speed * 2, steps + 1];
//     const reverse = [position, speed > 0 ? -1 : 1, steps + 1];
//     queue.push(accelerate);
//     queue.push(reverse);
//   }
//   return 0;
// }

// Example 1:
{
  // Base case where we can accelerate directly to target
  expect(racecar(0)).to.equal(0);
  expect(racecar(1)).to.equal(1);
  expect(racecar(3)).to.equal(2);
  expect(racecar(7)).to.equal(3);
  expect(racecar(15)).to.equal(4);
  // All targets between base cases 7 and 15
  expect(racecar(8)).to.equal(6); // AAA7RRA8 // 1,3,7,15
  expect(racecar(9)).to.equal(8); // AAA7RRARRA9 // edge case
  expect(racecar(10)).to.equal(7); // AAA7RRAA10
  expect(racecar(11)).to.equal(10);
  expect(racecar(12)).to.equal(7); // AAAA15,R,AA-3
  expect(racecar(13)).to.equal(9); // AAA7,RR,AAA7,RA
  expect(racecar(14)).to.equal(6);
}

// // Example 2:
// {
//   const target = 6;
//   const expected = 5;
//   expect(racecar(target)).to.equal(expected);
//   // Explanation: The shortest instruction sequence is "AAARA".
//   // Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
// }

// Example 3:
// {
//   const start = performance.now();
//   const target = 330;
//   const expected = 25;
//   expect(racecar(target)).to.equal(expected);
//   const end = performance.now();
//   console.log(`Execution time: ${end - start} ms`);
//   // Explanation: The shortest instruction sequence is "AAARA".
//   // Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
// }

{
  // These were the edge cases for which the floor/ceiling approach did not find the optimal solution:
  expect(racecar(5)).to.equal(7);
  // 1,3,7,15
  // floor AA3 RRA4 RRA5 (8 instructions)
  //       AA3 RRAA6 RA5 (8)
  // ceil AAA7 RAA4 RA5 (8)
  //  (7)
  expect(racecar(9)).to.equal(8);
  // floor AAA7 RRA8 RRA9 (9 instructions)
  // ceil AAAA15 RAAA8 RA9 (10)
  // optimal AAA7 RA6 RAA9 (8) (reverses mid way)
}
