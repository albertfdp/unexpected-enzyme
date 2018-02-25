import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

const Foo = () => <div>This is</div>;

describe('to-render-text', () => {
  it('passes when actual matches the expected', () => {
    expect(
      mount(
        <div>
          <b>important</b>
        </div>
      ),
      'to render text',
      'important'
    );
  });

  it('passes negated when actual does not match the expected', () => {
    expect(
      mount(
        <div>
          <b>important</b>
        </div>
      ),
      'not to render text',
      'unimportant'
    );
  });

  describe('when nested', () => {
    it('passes when actual matches the expected', () => {
      expect(
        mount(
          <div>
            <Foo /> <b>really</b> <b>important</b>
          </div>
        ),
        'to render text',
        'This is really important'
      );
    });
  });

  describe('<assertion>', () => {
    it('passes when actual matches the expected', () => {
      expect(
        mount(
          <div>
            <b>important</b>
          </div>
        ),
        'to render text',
        'to match',
        /import/
      );
    });
  });
});
