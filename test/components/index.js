import React from 'react';
import PropTypes from 'prop-types';

export const Foo = ({ bar, onButtonClick }) =>
  <div>
    <button onClick={onButtonClick}>Click me</button>
    {bar}
  </div>;

Foo.propTypes = {
  bar: PropTypes.string,
  onButtonClick: PropTypes.func
};

export const TodoList = () =>
  <ul className="todo">
    <TodoItem item="One" />
    <TodoItem item="Two" />
    <TodoItem item="Three" />
  </ul>;

export const TodoItem = ({ item }) =>
  <li className="item">
    {item}
  </li>;

TodoItem.propTypes = {
  item: PropTypes.string
};
