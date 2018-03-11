import expect from './unexpected-enzyme';
import React from 'react';
import enzyme from 'enzyme';

describe('inspect', () => {
  ['mount', 'shallow'].forEach(type => {
    let render;

    beforeEach(() => {
      render = enzyme[type];
    });

    describe(`with ${type}`, () => {
      it('handels an element without any children', () => {
        expect(render(<div />), 'when inspected to equal', '<div />');
      });

      it('handels an element with a single text child', () => {
        expect(
          render(<div>single</div>),
          'when inspected to equal',
          '<div>single</div>'
        );
      });

      it('handels multiple text childrens', () => {
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

      it('handels multiple text childrens mixed with elements', () => {
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
    });
  });
});
