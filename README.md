# xooks

General purpose react hooks collection

## Installation

xooks library has react@>=16.8.0 as peer dependency and [nanoid](https://www.npmjs.com/package/nanoid) as dependency.

```sh
# with npm
npm install --save xooks

# with yarn
yarn add xooks
```

## Included hooks

- [use-document-title](#use-document-title)
- [use-clipboard](#use-clipboard)
- [use-click-outside](#use-click-outside)
- [use-id](#use-id)
- [use-list-state](#use-list-state)

### use-document-title

Sets `document.title` property. Works only on client.

**Usage:**

```jsx
import React from 'react';
import { useDocumentTitle } from 'xooks';

export default function UseDocumentTitle() {
  useDocumentTitle('Document title');
  return <div>AppRoute</div>;
}
```

### use-clipboard

Provides interface to work with `navigator.clipboard`. Includes copied state timeout.

**Usage:**

```js
import React from 'react';
import { useClipboard } from 'xooks';

export default function UseClipboard() {
  const {
    copied, // indicates that value was recently copied to clipboard
    copy, // copy any string to clipboard
    reset, // reset copied timeout
    error, // error is set when navigator.clipboard.writeText promise caught an error
  } = useClipboard({ timeout: 3000 }); // timeout is optional (defaults to 2000) – ms when copied will return to false after copy was called

  return (
    <button type="button" onClick={() => clipboard.copy('Hello')}>
      {clipboard.copied ? 'Copied' : 'Copy Hello'}
    </button>
  );
}
```

### use-click-outside

Handle outside clicks and touches for provided ref.

**Usage:**

```js
import React, { useRef } from 'react';
import { useClickOutside } from 'xooks';

export default function UseClickOutside() {
  const ref = useRef();
  useClickOutside(ref, () => console.log('Clicked outside'));
  return <div ref={ref}>Click outside</div>;
}
```

### use-id

Provides unique overridable id that can be used as id for html elements, perfect for connecting labels with inputs.

**Usage:**

```js
import React from 'react';
import { useId } from 'xooks';

export default function UseId(props) {
  const inputId = useId(); // generates id as it was now provided -> xooks-V1StGXR8_Z5jdHi6B-myT
  const checkboxId = useId(props.id); // by default will use id from props, if it was not provided, it will generate one
  const alwaysTheSameId = useId('my-id'); // will always return my-id

  return (
    <div>
      <label htmlFor={inputId}>Input</label>
      <input type="text" id={inputId} />
    </div>

    <div>
      <label htmlFor={checkbox}>Checkbox id</label>
      <input type="checkbox" id={checkbox} />
    </div>
  );
}
```

### use-list-state

Provides convinient interface to work with array state.

**Usage:**

```js
import React from 'react';
import { useListState } from 'xooks';

export default function UseListState() {
  const [values, handlers] = useListState([{ a: 1 }]);
  // add one or more items to the end of the list
  const append = () => handlers.append({ a: 2 }); // values -> [{ a: 1 }, { a: 2 }]

  // add one or more items to the start of the list
  const prepend = () => handlers.prepend({ a: 3 }, { a: 4 }); // values -> [{ a: 3 }, { a: 4 }, { a: 1 }, { a: 2 }]

  // remove items at given positions
  const remove = () => handlers.remove(0, 2); // values -> [{ a: 4 }, { a: 2 }]

  // insert one or more items at given position
  const insert = () => handlers.insert(1, { a: 5 }); // values -> [{ a: 4 }, { a: 5 }, { a: 2 }]

  // apply function to each element of the list
  const apply = () => handlers.apply((item, index) => item.a * index); // values -> [0, 5, 4]

  // move item from one position to another
  const reorder = () => handlers.reorder({ from: 2, to: 0 }); // values -> [4, 0, 5]

  // set entirely new state
  const setState = () => handlers.setState([{ a: 6 }, { a: 7 }]); // values -> [{ a: 6 }, { a: 7 }]

  // set individual item at given position
  const setItem = () => handlers.setItem(0, { a: 8 }); // values -> [{ a: 8 }, { a: 7 }]

  // set item property at given position
  const setItemProp = () => handlers.setItemProp(1, 'a', 'new-prop'); // values -> [{ a: 8 }, { a: 'new-prop' }]
}
```
