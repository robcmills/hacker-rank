import { expect } from './deps.ts';
import { getTodos, Todo } from './filter-sort-todos.ts';

const todos: Todo[] = [
  {
    created: '2020-01-01',
    isDeleted: false,
    isDone: false,
    name: 'Alpha',
  },
  {
    created: '2020-01-02',
    isDeleted: false,
    isDone: false,
    name: 'Bravo',
  },
  {
    created: '2020-01-03',
    isDeleted: false,
    isDone: false,
    name: 'Charlie',
  },
  {
    created: '2020-01-04',
    isDeleted: false,
    isDone: true,
    name: 'Delta',
  },
  {
    created: '2020-01-05',
    isDeleted: true,
    isDone: true,
    name: 'Echo',
  },
];

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: true,
    },
    search: '',
    sortDirection: 'desc',
    sortKey: 'created',
    todos: [],
  })
).to.deep.equal([]);

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: false,
    },
    search: '',
    sortDirection: 'desc',
    sortKey: 'created',
    todos,
  })
).to.deep.equal([todos[2], todos[1], todos[0]]);

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: false,
    },
    search: '',
    sortDirection: 'asc',
    sortKey: 'created',
    todos,
  })
).to.deep.equal([todos[0], todos[1], todos[2]]);

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: true,
    },
    search: '',
    sortDirection: 'desc',
    sortKey: 'name',
    todos,
  })
).to.deep.equal([todos[3]]);

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: false,
    },
    search: 'HA',
    sortDirection: 'asc',
    sortKey: 'name',
    todos,
  })
).to.deep.equal([todos[0], todos[2]]);

expect(
  getTodos({
    filters: {
      isDeleted: false,
      isDone: false,
    },
    search: 'zulu',
    sortDirection: 'asc',
    sortKey: 'name',
    todos,
  })
).to.deep.equal([]);
