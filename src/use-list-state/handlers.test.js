import * as handlers from './handlers';

describe('use-list-state handlers', () => {
  test('append: adds one item to the end of the list', () => {
    expect(handlers.append([1], 2)).toEqual([1, 2]);
  });

  test('append: adds more than one item to the end of the list', () => {
    expect(handlers.append([1], 2, 3)).toEqual([1, 2, 3]);
    expect(handlers.append([1], 2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(handlers.append([1], 2, 3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('prepend: adds one item to the start of the list', () => {
    expect(handlers.prepend([1], 2)).toEqual([2, 1]);
  });

  test('prepend: adds more than one item to the start of the list', () => {
    expect(handlers.prepend([1], 2, 3)).toEqual([2, 3, 1]);
    expect(handlers.prepend([1], 2, 3, 4)).toEqual([2, 3, 4, 1]);
    expect(handlers.prepend([1], 2, 3, 4, 5)).toEqual([2, 3, 4, 5, 1]);
  });
});
