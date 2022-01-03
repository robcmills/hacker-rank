export function intersection(a, b) {
  const first = a.start < b.start ? a : b;
  const second = first === a ? b : a;
  if (first.end < second.start) return null;
  return {
    start: second.start,
    end: first.end < second.end ? first.end : second.end,
  };
}
