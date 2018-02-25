import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  render() {
    const { name, email } = this.context;

    return (
      <div className="user">
        {name}
        <span className="email">{email}</span>
      </div>
    );
  }
}

User.contextTypes = {
  name: PropTypes.string,
  email: PropTypes.string
};

describe('to-have-context-satisfying', () => {
  it('passes when the passed matches the expected', () => {
    expect(
      mount(<User />, {
        context: { name: 'Harriet Smith', email: 'harriet.smith@example.tld' }
      }),
      'to have context satisfying',
      {
        name: /Smith/,
        email: 'harriet.smith@example.tld'
      }
    );
  });

  it('fails when the actual does not match the expected', () => {
    expect(
      () =>
        expect(
          mount(<User />, {
            context: {
              name: 'Harriet Smith',
              email: 'harriet.smith@example.tld'
            }
          }),
          'to have context satisfying',
          {
            name: /Foo$/,
            email: 'harriet.smith@example.tld'
          }
        ),
      'with error matching snapshot'
    );
  });
});
