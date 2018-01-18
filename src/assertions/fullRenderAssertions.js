const fullRenderAssertions = function(childExpect) {
  childExpect.exportAssertion(
    ['<ReactWrapper> [not] to be checked'],
    (expect, reactWrapper) => {
      expect(reactWrapper.instance().checked, '[not] to be true');
    }
  );

  childExpect.exportAssertion(
    ['<ReactWrapper> [not] to contain <ReactElement>'],
    (expect, reactWrapper, reactElement) => {
      expect.errorMode = 'bubble';

      expect(reactWrapper.instance(), '[not] to contain', reactElement);
    }
  );

  childExpect.exportAssertion(
    ['<ReactWrapper> [not] to have props satisfying <object>'],
    (expect, reactWrapper, props) => {
      expect(reactWrapper.props(), '[not] to satisfy', props);
    }
  );

  childExpect.exportAssertion(
    ['<ReactWrapper> when setting props <object> <assertion>'],
    (expect, reactWrapper, props) => {
      expect.shift(reactWrapper.setProps(props));
    }
  );

  childExpect.exportAssertion(
    ['<ReactWrapper> when receiving event <string>'],
    (expect, reactWrapper, event) => {
      expect.shift(reactWrapper.simulate(event));
    }
  );
};

export default fullRenderAssertions;
