export function append(current, ...items) {
  return [...current, ...items];
}

export function prepend(current, ...items) {
  return [...items, ...current];
}

export function insert(current, index, ...items) {
  return [...current.slice(0, index), ...items, ...current.slice(index)];
}

export function apply(current, fn) {
  return current.map((item, index) => fn(item, index));
}

export function remove(current, ...indexes) {
  return current.filter((_, index) => !indexes.includes(index));
}

export function reorder(current, { from, to }) {
  const cloned = [...current];
  const item = current[from];

  cloned.splice(from, 1);
  cloned.splice(to, 0, item);

  return cloned;
}

export function setItem(current, index, item) {
  const cloned = [...current];
  cloned[index] = item;
  return cloned;
}

export function setItemProp(current, index, prop, value) {
  const cloned = [...current];
  cloned[index] = { ...cloned[index], [prop]: value };
  return cloned;
}

function bindHandler(handler, setState) {
  return (...args) => setState(current => handler(current, ...args));
}

export function bindHandlers(setState) {
  return {
    setState,
    append: bindHandler(append, setState),
    prepend: bindHandler(prepend, setState),
    insert: bindHandler(insert, setState),
    apply: bindHandler(apply, setState),
    remove: bindHandler(remove, setState),
    reorder: bindHandler(reorder, setState),
    setItem: bindHandler(setItem, setState),
    setItemProp: bindHandler(setItemProp, setState),
  };
}
