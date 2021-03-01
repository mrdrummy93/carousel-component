
# carousel-component

## Install

```angular2html
npm install --save carousel-component
```

or

```angular2html
yarn add carousel-component
```

### Note

`carousel-component` is using [styled-components](https://github.com/styled-components/styled-components) for styling. Don't forget to install it:

```bash
npm install --save styled-components
```

##Usage

```jsx
import React, {Component} from 'react';
import Carousel from 'carousel-component';
import {ELEMENT_SWIPE, ELEMENT_WIDTH} from "./constants";

const App = () => {
  const exampleItems = [
    {id: 1, title: 'item #1'},
    {id: 2, title: 'item #2'},
    {id: 3, title: 'item #3'},
    {id: 4, title: 'item #4'},
    {id: 5, title: 'item #5'}
  ];

  return (
    <Carousel width={ELEMENT_WIDTH} swipe={ELEMENT_SWIPE}>
      {exampleItems.map(item => <div key={item.id}>{item.title}</div>)}
    </Carousel>
  )
}
```

##Development

```console
git clone https://github.com/mrdrummy93/carousel-component.git
cd carousel-component
npm
```

###To run example
```console
npm example
```

The application is running at http://localhost:3000

##License

MIT © [mrdrummy93](https://github.com/mrdrummy93)
