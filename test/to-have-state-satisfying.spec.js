import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);

    this.state = {
      count: this.props.count
    };
  }

  increment() {
    this.setState(prev => ({
      count: prev.count + 1
    }));
  }

  render() {
    const { count } = this.state;

    return (
      <div className="count">
        {count}
        <button className="increment" onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

describe('to-have-state-satisfying', () => {
  describe('<assertion>', () => {
    describe('to-have-state', () => {
      it('passes when the actual matches the expected', () => {
        const wrapper = mount(<Counter count={0} />);

        expect(wrapper, 'to have state satisfying to have keys', ['count']);

        wrapper.find('button').simulate('click');

        expect(wrapper, 'to have state satisfying to have keys', ['count']);
      });

      it('fails when the actual does not match the expected', () => {
        expect(
          () =>
            expect(
              mount(<Counter count={0} />),
              'to have state satisfying to have keys',
              ['caunt', 'number']
            ),
          'with error matching snapshot'
        );
      });

      describe('when negated', () => {
        it('passes when the actual does not match the expected', () => {
          expect(
            mount(<Counter count={0} />),
            'to have state satisfying not to have keys',
            ['foobar']
          );
        });

        it('fails when the actual does match the expected', () => {
          expect(
            () =>
              expect(
                mount(<Counter count={0} />),
                'to have state satisfying not to have keys',
                ['count']
              ),
            'with error matching snapshot'
          );
        });
      });
    });
  });

  describe('<object>', () => {
    it('passes when the passed matches the expected', () => {
      const wrapper = mount(<Counter count={0} />);

      expect(wrapper, 'to have state satisfying', {
        count: 0
      });

      wrapper.find('button').simulate('click');

      expect(wrapper, 'to have state satisfying', {
        count: 1
      });
    });

    it('fails when the actual does not match the expected', () => {
      expect(
        () =>
          expect(mount(<Counter count={0} />), 'to have state satisfying', {
            count: 3,
            number: 0
          }),
        'with error matching snapshot'
      );
    });
  });
});
