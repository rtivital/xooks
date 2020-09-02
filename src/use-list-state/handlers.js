export function append(current, ...items) {
  return [...current, ...items];
}

export function prepend(current, ...items) {
  return [...items, ...current];
}

export function insert(current, index, ...items) {
  return [...current.slice(0, index), ...items, ...current.slice(index + 1)];
}

export function apply(current, fn) {
  return current.map((item, index) => fn(item, index));
}

export function remove(current, ...indexes) {
  const cloned = [...current];

  for (let i = 0; i < indexes.length; i += 1) {
    cloned.splice(indexes[i], 1);
  }

  return cloned;
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
