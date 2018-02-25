import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

const Foo = () => <div>This is</div>;

describe('to-render-text', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <div>
        <b>important</b>
      </div>
    );
  });

  it('passes when actual matches the expected', () => {
    expect(wrapper, 'to render text', 'important');
  });

  it('passes negated when actual does not match the expected', () => {
    expect(wrapper, 'not to render text', 'unimportant');
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
      expect(wrapper, 'to render text satisfying to match', /import/);
      expect(wrapper, 'to render text satisfying to begin with', 'imp');
      expect(wrapper, 'to render text satisfying to contain', 'port');
      expect(wrapper, 'to render text satisfying to have length', 9);
    });

    it('fails when actual does not match the expected', () => {
      expect(
        () => expect(wrapper, 'to render text satisfying to match', /foo/),
        'with error matching snapshot'
      );

      expect(
        () => expect(wrapper, 'to render text satisfying to have length', 10),
        'with error matching snapshot'
      );
    });
  });
});
