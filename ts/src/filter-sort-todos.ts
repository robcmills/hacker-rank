// Write a function to filter and sort a list of Todo's.

// A date string in the format "YYYY-MM-DD"
export type ISODateString = string;

export type Todo = {
  created: ISODateString;
  isDeleted: boolean;
  isDone: boolean;
  name: string;
};

export type TodosFilters = {
  isDeleted: boolean;
  isDone: boolean;
};

export type GetTodosArgs = {
  filters: TodosFilters;
  search: string;
  sortDirection: 'asc' | 'desc';
  sortKey: keyof Todo;
  readonly todos: Todo[];
};

export function getTodos({
  filters,
  search,
  sortKey,
  sortDirection,
  todos,
}: GetTodosArgs): Todo[] {
  return todos
    .filter(
      (todo) =>
        filters.isDeleted === todo.isDeleted && filters.isDone === todo.isDone
    )
    .filter((todo) => todo.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a[sortKey] === b[sortKey]) return 0;
      if (sortDirection === 'asc') {
        return a[sortKey] < b[sortKey] ? -1 : 1;
      } else {
        return a[sortKey] > b[sortKey] ? -1 : 1;
      }
    });
}
