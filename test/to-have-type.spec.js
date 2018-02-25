import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';

const Foo = () => <div>Component</div>;
const Bar = () => <span>Another</span>;

describe('to-have-type', () => {
  describe('string', () => {
    it('passes when actual matches expected', () => {
      expect(mount(<div />), 'to have type', 'div');
    });

    it('passes negated when actual does not match the expected', () => {
      expect(mount(<div />), 'not to have type', 'span');
    });

    it('fails when actual does not match expected', () => {
      expect(
        () => expect(mount(<div />), 'to have type', 'span'),
        'with error matching snapshot'
      );
    });

    it('fails when negated actual matches expected', () => {
      expect(
        () => expect(mount(<div />), 'not to have type', 'div'),
        'with error matching snapshot'
      );
    });
  });

  describe('function', () => {
    it('passes when actual matches expected', () => {
      expect(mount(<Foo />), 'to have type', Foo);
    });

    it('passes negated when actual does not match the expected', () => {
      expect(mount(<Foo />), 'not to have type', Bar);
    });

    it('fails when actual does not match expected', () => {
      expect(
        () => expect(mount(<Foo />), 'to have type', Bar),
        'with error matching snapshot'
      );
    });

    it('fails when negated actual matches expected', () => {
      expect(
        () => expect(mount(<Foo />), 'not to have type', Foo),
        'with error matching snapshot'
      );
    });
  });
});
