import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ children }) => (
  <div className="user">
    <h3 id="name">Harriet</h3>
    {children}
  </div>
);

User.propTypes = {
  children: PropTypes.node
};

describe('to-satisfy', () => {
  describe('when it is a subtree', () => {
    it('passes when the actual matches the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Children</div>
        </User>
      );

      expect(
        wrapper,
        'to satisfy',
        <div className="user">
          <h3 id="name">Harriet</h3>
          <div id="child">Children</div>
        </div>
      );
    });

    it('fails when the actual does not the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () =>
          expect(
            wrapper,
            'to satisfy',
            <div className="user">
              <h3 id="name">Harriet</h3>
              <div id="child">Children</div>
            </div>
          ),
        'with error matching snapshot'
      );
    });

    it('fails when the actual not matching the expected type', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () => expect(wrapper, 'to satisfy', <h3>Header</h3>),
        'with error matching snapshot'
      );
    });
  });

  describe('with the exhaustively flag', () => {
    it('passes if the wrapper represents an element that is equal to the given element', () =>
      expect(
        mount(
          <User>
            <div id="child">Children</div>
          </User>
        ),
        'to exhaustively satisfy',
        <div className="user">
          <h3 id="name">Harriet</h3>
          <div id="child">Children</div>
        </div>
      ));

    it('fails when the actual does not match the expected', () =>
      expect(
        () =>
          expect(
            mount(
              <User>
                <div id="child">Children</div>
              </User>
            ),
            'to exhaustively satisfy',
            <div id="kids">Kids</div>
          ),
        'with error matching snapshot'
      ));

    describe('when negated', () => {
      it('passes when actual is not equal the expected', () =>
        expect(
          mount(
            <User>
              <div id="child">Children</div>
            </User>
          ),
          'not to exhaustively satisfy',
          <div className="user">
            <h3 id="name">Harriet</h3>
            <div id="kids">Kids</div>
          </div>
        ));

      it('fails when actual is equal the expected', () =>
        expect(
          () =>
            expect(
              mount(
                <User>
                  <div id="child">Children</div>
                </User>
              ),
              'not to exhaustively satisfy',
              <div className="user">
                <h3 id="name">Harriet</h3>
                <div id="child">Children</div>
              </div>
            ),
          'with error matching snapshot'
        ));
    });
  });
});
