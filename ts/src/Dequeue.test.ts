import { expect } from 'chai';
import { Dequeue } from './Dequeue';

{
  const queue = new Dequeue();
  expect(queue.size()).to.equal(0);
  queue.push(1);
  expect(queue.size()).to.equal(1);
  queue.push(2);
  queue.push(3);
  expect(queue.size()).to.equal(3);
  expect(queue.shift()).to.equal(1);
  expect(queue.shift()).to.equal(2);
  expect(queue.size()).to.equal(1);
  expect(queue.shift()).to.equal(3);
  expect(queue.shift()).to.equal(null);
  expect(queue.shift()).to.equal(null);
  expect(queue.size()).to.equal(0);
}
