const fullRenderAssertions = function(expect) {
  expect.addAssertion(
    ['<ReactWrapper> [not] to be checked'],
    (expect, reactWrapper) => {
      expect(reactWrapper.instance().checked, '[not] to be true');
    }
  );

  expect.addAssertion(
    ['<ReactWrapper> [not] to have props satisfying <object>'],
    (expect, reactWrapper, props) => {
      expect(reactWrapper.props(), '[not] to satisfy', props);
    }
  );

  expect.addAssertion(
    ['<ReactWrapper> when setting props <object> <assertion>'],
    (expect, reactWrapper, props) => {
      expect.shift(reactWrapper.setProps(props));
    }
  );

  expect.addAssertion(
    ['<ReactWrapper> when receiving event <string>'],
    (expect, reactWrapper, event) => {
      expect.shift(reactWrapper.simulate(event));
    }
  );
};

export default fullRenderAssertions;
