
# carousel-component

This is a simple carousel component which support:
- **Mobile and Web**
- **Swipes**
- **Pagination**

## Install

```console
git clone https://github.com/mrdrummy93/carousel-component.git
cd carousel-component
npm install
```

or

```console
git clone https://github.com/mrdrummy93/carousel-component.git
cd carousel-component
yarn install
```

## Usage

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
    <Carousel width={ELEMENT_WIDTH} swipe={REQUIRED_SWIPE}>
      {exampleItems.map(item => <div key={item.id}>{item.title}</div>)}
    </Carousel>
  )
}
```

## Attributes

| Name  | Is Required  | Description |
|:----- |:------------:| :---------- |
| width |     Yes      | Setting the width of an element |
| swipe |      No      | Setting the distance required for swiping |

### To run example
```console
npm run example
```

The application is running at http://localhost:3000
