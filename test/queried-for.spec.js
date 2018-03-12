import expect from './unexpected-enzyme';
import enzyme from 'enzyme';
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
  ['mount', 'shallow'].forEach(type => {
    let render;

    beforeEach(() => {
      render = enzyme[type];
    });

    describe(type, () => {
      it('passes when the actual matches the expected', () => {
        const wrapper = render(<Fixture />);

        expect(
          wrapper,
          'queried for',
          '#parent',
          'to satisfy',
          <div id="child">Children</div>
        );
      });

      it('fails when the actual does not match the expected', () => {
        const wrapper = render(<Fixture />);

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
  });
});
