import expect from './unexpected-enzyme';
import enzyme from 'enzyme';
import React, { Component } from 'react';

class Fixture extends Component {
  render() {
    return (
      <div>
        <input id="checked" defaultChecked />
        <input id="not" defaultChecked={false} />
      </div>
    );
  }
}

describe('to-be-checked', () => {
  ['mount', 'shallow'].forEach(type => {
    let render;

    beforeEach(() => {
      render = enzyme[type];
    });

    describe(type, () => {
      let wrapper;

      beforeEach(() => {
        wrapper = render(<Fixture />);
      });

      it('passes when the actual matches the expected', () => {
        expect(wrapper.find('#checked'), 'to be checked');
      });

      it('passes negated when the actual does not match the expected', () => {
        expect(wrapper.find('#not'), 'not to be checked');
      });

      it('fails when the actual does not match the expected', () => {
        expect(
          () => expect(wrapper.find('#not'), 'to be checked'),
          'with error matching snapshot'
        );

        expect(() => {
          expect(wrapper.find('#checked'), 'not to be checked');
        }, 'with error matching snapshot');
      });
    });
  });
});
