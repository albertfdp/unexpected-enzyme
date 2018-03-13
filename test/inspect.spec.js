import expect from './unexpected-enzyme';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import enzyme from 'enzyme';

const ReverseChildren = ({ children }) => (
  <div>{Children.toArray(children).reverse()}</div>
);
ReverseChildren.propTypes = {
  children: PropTypes.node
};

describe('inspect', () => {
  ['mount', 'shallow'].forEach(type => {
    let render;

    beforeEach(() => {
      render = enzyme[type];
    });

    describe(`with ${type}`, () => {
      it('handles an element without any children', () => {
        expect(render(<div />), 'when inspected to equal', '<div />');
      });

      it('handles an element with a single text child', () => {
        expect(
          render(<div>single</div>),
          'when inspected to equal',
          '<div>single</div>'
        );
      });

      it('handles multiple text childrens', () => {
        expect(
          render(
            <div>
              {'foo'}
              {'bar'}
              {'baz'}
            </div>
          ),
          'when inspected to equal',
          '<div>foobarbaz</div>'
        );
      });

      it('handles multiple text childrens mixed with elements', () => {
        expect(
          render(
            <div>
              foo
              <div />
              bar
              <div />
              baz
            </div>
          ),
          'when inspected to equal',
          '<div>foo<div />bar<div />baz</div>'
        );
      });

      it('handles function props', () => {
        const myHandler = () => {
          // clicked
        };

        expect(
          render(<button onClick={myHandler}>Click me!</button>),
          'when inspected to equal',
          '<button onClick={...}>Click me!</button>'
        );
      });

      it('does not render undefined props', () => {
        expect(
          render(<div id="undefined" className={undefined} />),
          'when inspected to equal',
          '<div id="undefined" />'
        );
      });
    });
  });

  it('dot out deeply nested props', () => {
    const ConfigProvider = () => <div />; // fake

    expect(
      enzyme.mount(
        <ConfigProvider config={{ nested: { deeply: { nested: 'value' } } }}>
          <div />
        </ConfigProvider>
      ),
      'when inspected to equal',
      [
        '<ConfigProvider config={{ nested: ... }}>',
        '  <div />',
        '</ConfigProvider>'
      ].join('\n')
    );
  });

  it('does not dot out props containing react nodes', () => {
    const Fullname = ({ firstName, lastName }) => (
      <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
      </div>
    );
    Fullname.propTypes = {
      firstName: PropTypes.node,
      lastName: PropTypes.node
    };

    expect(
      enzyme.mount(
        <Fullname
          firstName={<span>Sune</span>}
          lastName={<span>Simonsen</span>}
        />
      ),
      'when inspected to equal',
      [
        '<Fullname firstName={<span>Sune</span>} lastName={<span>Simonsen</span>}>',
        '  <div>',
        '    <div><span>Sune</span></div>',
        '    <div><span>Simonsen</span></div>',
        '  </div>',
        '</Fullname>'
      ].join('\n')
    );
  });

  it('inspects children as they are written', () => {
    expect(
      enzyme.mount(
        <ReverseChildren>
          <span>One</span>
          <span>Two</span>
          <span>Three</span>
        </ReverseChildren>
      ),
      'when inspected to equal',
      [
        '<ReverseChildren>',
        '  <span>One</span>',
        '  <span>Two</span>',
        '  <span>Three</span>',
        '</ReverseChildren>'
      ].join('\n')
    );
  });
});
