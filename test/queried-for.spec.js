import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <div id="parent" className="old friendly">
          <div id="child">Children</div>
        </div>
      </div>
    );
  }
}

describe('queried-for', () => {
  it('passes when the actual matches the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(
      wrapper,
      'queried for',
      '#parent',
      'to satisfy',
      <div className="old friendly">
        <div id="child">Children</div>
      </div>
    );
  });

  it('fails when the actual does not match the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(
      () =>
        expect(
          wrapper,
          'queried for',
          '#parent',
          'to satisfy',
          <div>
            <div id="child">Foo</div>
          </div>
        ),
      'with error matching snapshot'
    );
  });
});
