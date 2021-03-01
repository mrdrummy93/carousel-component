import React from 'react';
import { hot } from 'react-hot-loader';
import Carousel from '../src/Carousel';
import { ELEMENT_SWIPE, ELEMENT_WIDTH, ELEMENTS_COUNT } from './constants';
import ExampleElement from './ExampleElement';

const App = () => {
  const exampleChildrens = [];

  for (let i = 0; i < ELEMENTS_COUNT; i += 1) {
    exampleChildrens.push(`rgb(${
      Math.floor(Math.random() * 256)
    }, ${
      Math.floor(Math.random() * 256)
    }, ${
      Math.floor(Math.random() * 256)
    })`);
  }

  return (
    <div>
      <Carousel width={ELEMENT_WIDTH} swipe={ELEMENT_SWIPE}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {exampleChildrens.map((color, index) => <ExampleElement color={color} key={index} />)}
      </Carousel>
    </div>
  );
};

export default hot(module)(App);
