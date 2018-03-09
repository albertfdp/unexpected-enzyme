import expect from './unexpected-enzyme';
import React from 'react';
import PropTypes from 'prop-types';

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <div id="parent" className="old friendly">
          <div id="child">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Fixture.propTypes = {
  children: PropTypes.node
};

describe('to-equal', () => {
  describe('comparing react elements', () => {
    it('passes when the given react elements are equals', () =>
      expect(
        <div>
          <div id="parent" className="old friendly">
            <div id="child">Children</div>
          </div>
        </div>,
        'to equal',
        <div>
          <div id="parent" className="old friendly">
            <div id="child">Children</div>
          </div>
        </div>
      ));

    it('fails when the actual does not match the expected', () =>
      expect(
        () =>
          expect(
            <div>
              <div id="parent" className="old friendly">
                <div id="child">Children</div>
              </div>
            </div>,
            'to equal',
            <div>
              <div id="parents" className="old friendly">
                <div id="child">Kids</div>
              </div>
            </div>
          ),
        'with error matching snapshot'
      ));

    describe('when negated', () => {
      it('passes when actual is not equal the expected', () =>
        expect(
          <div>
            <div id="parent" className="old friendly">
              <div id="child">Children</div>
            </div>
          </div>,
          'not to equal',
          <div>
            <div id="parents" className="old friendly">
              <div id="childs">Kids</div>
            </div>
          </div>
        ));

      it('fails when actual is equal the expected', () =>
        expect(
          () =>
            expect(
              <div>
                <div id="parent" className="old friendly">
                  <div id="child">Children</div>
                </div>
              </div>,
              'not to equal',
              <div>
                <div id="parent" className="old friendly">
                  <div id="child">Children</div>
                </div>
              </div>
            ),
          'with error matching snapshot'
        ));
    });
  });
});
