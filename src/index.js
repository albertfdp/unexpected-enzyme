const unexpectedReact = require('unexpected-react');
const ReactWrapper = require('enzyme/build/ReactWrapper').default;

const unexpectedEnzyme = {
  name: 'unexpected-enzyme',

  installInto: function(expect) {
    var childExpect = expect.child();
    childExpect.use(unexpectedReact);

    childExpect.exportType(childExpect.getType('ReactElement'));

    childExpect.exportType({
      name: 'ReactWrapper',
      identify: function(reactWrapper) {
        return reactWrapper && reactWrapper instanceof ReactWrapper;
      },
      inspect: function(reactWrapper, depth, output) {
        output.appendInspected(reactWrapper.getElement());
      }
    });

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to be checked',
      (expect, reactWrapper) => {
        expect(reactWrapper.instance().checked, '[not] to be true');
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to contain <ReactElement>',
      (expect, reactWrapper, reactElement) => {
        if (
          expect.flags.not ===
          reactWrapper.containsMatchingElement(reactElement)
        ) {
          expect.errorMode = 'bubble';

          return expect(
            reactWrapper.getElement(),
            '[not] to contain with all wrappers',
            reactElement
          );
        }
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to have state satisfying <object>',
      (expect, reactWrapper, state) => {
        return expect(reactWrapper.state(), 'to satisfy', state);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to have props satisfying <object>',
      (expect, reactWrapper, props) => {
        return expect(reactWrapper.props(), 'to satisfy', props);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to have props <array>',
      (expect, reactWrapper, props) => {
        return expect(reactWrapper.props(), '[not] to have keys', props);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> when setting props <object> <assertion>',
      (expect, reactWrapper, props) => {
        return expect.shift(reactWrapper.setProps(props));
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> when receiving event <string>',
      (expect, reactWrapper, event) => {
        return expect.shift(reactWrapper.simulate(event));
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to have class <string>',
      (expect, reactWrapper, className) => {
        if (expect.flags.not === reactWrapper.hasClass(className)) {
          const classes = (reactWrapper.prop('className') || '').split(' ');
          expect(classes, '[not] to contain', className);
        }
      }
    );
  }
};

unexpectedEnzyme.clearAll = unexpectedReact.clearAll;

module.exports = unexpectedEnzyme;
