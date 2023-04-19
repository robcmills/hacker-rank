import { expect } from 'chai';

/*
1041. Robot Bounded In Circle
Medium
3.4K
656
Companies
On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:

The north direction is the positive direction of the y-axis.
The south direction is the negative direction of the y-axis.
The east direction is the positive direction of the x-axis.
The west direction is the negative direction of the x-axis.
The robot can receive one of three instructions:

"G": go straight 1 unit.
"L": turn 90 degrees to the left (i.e., anti-clockwise direction).
"R": turn 90 degrees to the right (i.e., clockwise direction).
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.


Constraints:

1 <= instructions.length <= 100
instructions[i] is 'G', 'L' or, 'R'.

### Approach

  instructions = GGL
                   -90

        │         
      ↓<<
      ↓ ↑
    ──>>↑──
        │

  GLGR

     │         
     │
   ↑<<
  ───↑──
     │

  GLGLGG
   ↑ ↑  -180

    │
   ↓<
  ─↓↑──
   ↓↑
   >↑
    │


  GGLGLGLGGG -270

    │
   ↓<   ↓<
   >↑>>>>↑
  ──↑───↓
    │   ↓


Simulate the instructions once and check for 

- change in position
- change in direction

We have a cycle if:
the position is the same as start or
the direction is changed

*/
function isRobotBounded(instructions: string): boolean {
  let posX = 0;
  let posY = 0;
  let dirX = 0;
  let dirY = 1;

  for (let i of instructions) {
    if (i === 'G') {
      posX += dirX;
      posY += dirY;
    } else if (i === 'L') {
      [dirX, dirY] = [-dirY, dirX];
    } else {
      [dirX, dirY] = [dirY, -dirX];
    }
  }
  return (posX === 0 && posY === 0) || (dirX !== 0 && dirY !== 1);
}

// Example 1:
{
  const instructions = 'GGLLGG';
  expect(isRobotBounded(instructions)).to.be.true;
  // Explanation: The robot is initially at (0, 0) facing the north direction.
  // "G": move one step. Position: (0, 1). Direction: North.
  // "G": move one step. Position: (0, 2). Direction: North.
  // "L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: West.
  // "L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: South.
  // "G": move one step. Position: (0, 1). Direction: South.
  // "G": move one step. Position: (0, 0). Direction: South.
  // Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (0, 2) --> (0, 1) --> (0, 0).
  // Based on that, we return true.
}

// Example 2:
{
  const instructions = 'GG';
  expect(isRobotBounded(instructions)).to.be.false;
  // Explanation: The robot is initially at (0, 0) facing the north direction.
  // "G": move one step. Position: (0, 1). Direction: North.
  // "G": move one step. Position: (0, 2). Direction: North.
  // Repeating the instructions, keeps advancing in the north direction and does not go into cycles.
  // Based on that, we return false.
}

// Example 3:
{
  const instructions = 'GL';
  expect(isRobotBounded(instructions)).to.be.true;
  // Explanation: The robot is initially at (0, 0) facing the north direction.
  // "G": move one step. Position: (0, 1). Direction: North.
  // "L": turn 90 degrees anti-clockwise. Position: (0, 1). Direction: West.
  // "G": move one step. Position: (-1, 1). Direction: West.
  // "L": turn 90 degrees anti-clockwise. Position: (-1, 1). Direction: South.
  // "G": move one step. Position: (-1, 0). Direction: South.
  // "L": turn 90 degrees anti-clockwise. Position: (-1, 0). Direction: East.
  // "G": move one step. Position: (0, 0). Direction: East.
  // "L": turn 90 degrees anti-clockwise. Position: (0, 0). Direction: North.
  // Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (-1, 1) --> (-1, 0) --> (0, 0).
  // Based on that, we return true.
}

// Example 4:
{
  const instructions = 'LLGRL';
  expect(isRobotBounded(instructions)).to.be.false;
}
