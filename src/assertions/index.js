import fullRenderAssertions from './fullRenderAssertions';

const assertions = {
  installInto: function(childExpect) {
    fullRenderAssertions(childExpect);
  }
};

export default assertions;
