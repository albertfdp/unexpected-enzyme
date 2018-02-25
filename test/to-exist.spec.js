import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <div id="parent" />
      </div>
    );
  }
}

describe('to-have-props-satisfying', () => {
  it('passes when the actual matches the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(wrapper.find('#parent'), 'to exist');
  });

  it('passes negated when the actual matches the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(wrapper.find('#foo'), 'not to exist');
  });

  it('fails when the actual does not match the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(
      () => expect(wrapper.find('#foobar'), 'to exist'),
      'with error matching snapshot'
    );
  });

  describe('with queried for', () => {
    it('fails when the actual does not match the expected', () => {
      const wrapper = mount(<Fixture />);

      expect(
        () => expect(wrapper, 'queried for', '#foobar', 'to exist'),
        'with error matching snapshot'
      );
    });
  });

  it('fails when the actual negated matches the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(
      () => expect(wrapper.find('#parent'), 'not to exist'),
      'with error matching snapshot'
    );
  });
});
