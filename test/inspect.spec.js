import expect from './unexpected-enzyme';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';

const ReverseChildren = ({ children }) => (
  <div>{Children.toArray(children).reverse()}</div>
);
ReverseChildren.propTypes = {
  children: PropTypes.node
};

describe('inspect', () => {
  describe('with shallow', () => {
    const render = shallow;
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

  describe('with mount', () => {
    const render = mount;

    it('handles an element without any children', () => {
      expect(render(<div />), 'when inspected to equal', '<div></div>');
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
        '<div>foo<div></div>bar<div></div>baz</div>'
      );
    });

    it('handles function props', () => {
      const myHandler = () => {
        // clicked
      };

      expect(
        render(<button onClick={myHandler}>Click me!</button>),
        'when inspected to equal',
        '<button>Click me!</button>'
      );
    });

    it('does not render undefined props', () => {
      expect(
        render(<div id="undefined" className={undefined} />),
        'when inspected to equal',
        '<div id="undefined"></div>'
      );
    });

    it('dot out deeply nested props', () => {
      const ConfigProvider = () => <div />; // fake

      expect(
        render(
          <ConfigProvider config={{ nested: { deeply: { nested: 'value' } } }}>
            <div />
          </ConfigProvider>
        ),
        'when inspected to equal',
        '<div></div>'
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
        render(
          <Fullname
            firstName={<span>Sune</span>}
            lastName={<span>Simonsen</span>}
          />
        ),
        'when inspected to equal',
        [
          '<div>',
          '  <div><span>Sune</span></div>',
          '  <div><span>Simonsen</span></div>',
          '</div>'
        ].join('\n')
      );
    });

    it('inspects children as they are written', () => {
      expect(
        render(
          <ReverseChildren>
            <span>One</span>
            <span>Two</span>
            <span>Three</span>
          </ReverseChildren>
        ),
        'when inspected to equal',
        '<div><span>Three</span><span>Two</span><span>One</span></div>'
      );
    });
  });
});
