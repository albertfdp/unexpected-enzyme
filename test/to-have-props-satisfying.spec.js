import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  render() {
    const { name, email } = this.props;

    return (
      <div className="user">
        {name}
        <span className="email">{email}</span>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
};

describe('to-have-props-satisfying', () => {
  it('passes when the passed matches the expected', () => {
    expect(
      mount(<User name="Harriet Smith" email="harriet.smith@example.tld" />),
      'to have props satisfying',
      {
        name: /Smith$/,
        email: 'harriet.smith@example.tld'
      }
    );
  });

  it('fails when the actual does not match the expected', () => {
    expect(
      () =>
        expect(
          mount(
            <User name="Harriet Smith" email="harriet.smith@example.tld" />
          ),
          'to have props satisfying',
          {
            name: /Foo$/,
            email: 'harriet.smith@example.tld'
          }
        ),
      'with error matching snapshot'
    );
  });
});
