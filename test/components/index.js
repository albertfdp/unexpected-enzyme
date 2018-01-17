import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ index }) => <span>User {index}</span>;

export class UserList extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <User index={1} />
          </li>
          <li>
            <User index={2} />
            <User index={3} />
          </li>
        </ul>
      </div>
    );
  }
}

export const Foo = ({ bar, onButtonClick }) => (
  <div>
    <button onClick={onButtonClick}>Click me</button>
    {bar}
  </div>
);

Foo.propTypes = {
  bar: PropTypes.string,
  onButtonClick: PropTypes.func
};

export const TodoList = () => (
  <ul className="todo">
    <TodoItem item="One" />
    <TodoItem item="Two" />
    <TodoItem item="Three" />
  </ul>
);

export const TodoItem = ({ item }) => <li className="item">{item}</li>;

TodoItem.propTypes = {
  item: PropTypes.string
};
