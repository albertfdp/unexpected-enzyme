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

describe('to-have-props', () => {
  it('passes when the actual matches the expected', () => {
    expect(
      mount(<User name="Harriet Banks" email="harriet.banks@kinetar.com" />),
      'to have props',
      ['name', 'email']
    );
  });

  it('fails when the actual does not match the expected', () => {
    expect(
      () =>
        expect(
          mount(
            <User name="Harriet Banks" email="harriet.banks@kinetar.com" />
          ),
          'to have props',
          ['name', 'account']
        ),
      'with error matching snapshot'
    );
  });

  describe('when negated', () => {
    it('passes when the actual does not match the expected', () => {
      expect(
        mount(<User name="Harriet Banks" email="harriet.banks@kinetar.com" />),
        'not to have props',
        ['id']
      );
    });

    it('fails when the actual does match the expected', () => {
      expect(
        () =>
          expect(mount(<User name="Harriet" />), 'not to have props', ['name']),
        'with error matching snapshot'
      );
    });
  });
});
