import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

class Fixture extends React.Component {
  render() {
    return (
      <div className="root top">
        <span className="child bottom">test</span>
      </div>
    );
  }
}

const Level = ({ children }) => children;

const Nested = () => (
  <Level>
    <Level>
      <Level>
        <Level>
          <Fixture />
        </Level>
      </Level>
    </Level>
  </Level>
);

describe('to-have-class', () => {
  it('passes when the actual matches the expected', () => {
    const wrapper = mount(
      <div className="root top">
        <span className="child bottom">test</span>
      </div>
    );

    expect(wrapper, 'to have class', 'root');
    expect(wrapper, 'to have class', 'root top');
    expect(wrapper, 'to have class', 'top');
  });

  it('passes negated when the actual does not match the expected', () => {
    const wrapper = mount(
      <div className="root top">
        <span className="child bottom">test</span>
      </div>
    );

    expect(wrapper, 'not to have class', 'child');
    expect(wrapper, 'not to have class', 'child top');
    expect(wrapper, 'not to have class', 'bottom');
  });

  it('fails when the actual does not match the expected', () => {
    const wrapper = mount(
      <div className="root top">
        <span className="child bottom">test</span>
      </div>
    );

    expect(
      () => expect(wrapper, 'to have class', 'hotpink'),
      'with error matching snapshot'
    );

    expect(
      () => expect(wrapper, 'to have class', 'rot top'),
      'with error matching snapshot'
    );
  });

  describe('when rendering a Component', () => {
    it('passes when the actual matches the expected', () => {
      const wrapper = mount(<Fixture />);

      expect(wrapper, 'to have class', 'root');
      expect(wrapper, 'to have class', 'root top');
      expect(wrapper, 'to have class', 'top');
    });
  });

  describe('when deeply nested', () => {
    it('passes when the actual matches the expected', () => {
      const wrapper = mount(<Nested />);

      expect(wrapper, 'to have class', 'root');
      expect(wrapper, 'to have class', 'root top');
      expect(wrapper, 'to have class', 'top');
    });
  });
});
