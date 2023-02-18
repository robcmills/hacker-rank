import { expect } from 'chai';

/*
Determine the minimum cost to provide library access to all citizens of HackerLand.
There are n cities numbered from 1 to n.
Currently there are no libraries and the cities are not connected.
Bidirectional roads may be built between any city pair listed in _cities_.
A citizen has access to a library if:
- Their city contains a library.
- They can travel by road from their city to a city containing a library.
*/
function roadsAndLibraries(
  numCities: number,
  libraryCost: number,
  roadCost: number,
  cities: [number, number][] // Each tuple represents a pair of cities (1-based index) that can be connected by a new road
): number {

}

expect(
  roadsAndLibraries(3, 2, 1, [
    [1, 2],
    [3, 1],
    [2, 3],
  ])
).to.equal(4);
expect(
  roadsAndLibraries(6, 2, 5, [
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
    [5, 6],
  ])
).to.equal(12);
