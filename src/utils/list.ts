export function getNextIndex<T>(list: T[], currentIndex: number): number {
  const next = currentIndex + 1;
  if (next >= list.length) {
    return 0;
  }

  return next;
}

export function getPreviousIndex<T>(list: T[], currentIndex: number): number {
  const previous = currentIndex - 1;
  if (previous < 0) {
    return list.length - 1;
  }

  return previous;
}
