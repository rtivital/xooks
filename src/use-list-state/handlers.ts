export function append<T>(current: T[], ...items: T[]) {
  return [...current, ...items];
}

export function prepend<T>(current: T[], ...items: T[]) {
  return [...items, ...current];
}

export function insert<T>(current: T[], index: number, ...items: T[]) {
  return [...current.slice(0, index), ...items, ...current.slice(index)];
}

export function apply<T>(current: T[], fn: (arg0: T, arg1: number) => T) {
  return current.map((item, index) => fn(item, index));
}

export function remove<T>(current: T[], ...indicies: number[]) {
  return current.filter((_, index) => !indicies.includes(index));
}

export function reorder<T>(current: T[], { from, to }: { from: number; to: number }) {
  const cloned = [...current];
  const item = current[from];

  cloned.splice(from, 1);
  cloned.splice(to, 0, item);

  return cloned;
}

export function setItem<T>(current: T[], index: number, item: T) {
  const cloned = [...current];
  cloned[index] = item;
  return cloned;
}

export function setItemProp<T>(current: T[], index: number, prop: string, value: any) {
  const cloned = [...current];
  cloned[index] = { ...cloned[index], [prop]: value };
  return cloned;
}

type Handler =
  | typeof append
  | typeof prepend
  | typeof insert
  | typeof apply
  | typeof remove
  | typeof reorder
  | typeof setItem
  | typeof setItemProp;

// function bindHandler<T, U>(handler: Handler, setState: U) {
//   return (...args) => setState((current) => handler(current, ...args));
// }

export function bindHandlers<T, U>(setState: U) {
  return {
    setState,
    append: setState(current => )
    prepend: bindHandler<T>(prepend, setState),
    insert: bindHandler<T>(insert, setState),
    apply: bindHandler<T>(apply, setState),
    remove: bindHandler<T>(remove, setState),
    reorder: bindHandler<T>(reorder, setState),
    setItem: bindHandler<T>(setItem, setState),
    setItemProp: bindHandler<T>(setItemProp, setState),
  };
}
