'use strict';

/*
2
5
2 1 5 3 4
5
2 5 1 3 4
*/

/*
2
8
5 1 2 3 7 8 6 4
8
1 2 5 3 7 8 6 4
1 2 3 4 5 6 7 8 position
0 0 2-1 2 2-1-4 diff
0 0 2 2 4 4 
*/

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(queue) {
    let bribes = 0;
    let currentPosition = 1;
    for (let originalPosition of queue) {
        const difference = originalPosition - currentPosition;
        if (difference > 2) {
            console.log('Too chaotic');
            return;
        }
        bribes += difference > 0 ? difference : 0;
        currentPosition++;
    }
    console.log(bribes);
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const q = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
