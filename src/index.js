const unexpectedReact = require('unexpected-react');
const ReactWrapper = require('enzyme/build/ReactWrapper').default;

const unexpectedEnzyme = {
  name: 'unexpected-enzyme',

  installInto: function(expect) {
    const childExpect = expect.child();
    childExpect.use(unexpectedReact);

    childExpect.exportType(childExpect.getType('ReactElement'));

    childExpect.exportType({
      name: 'ReactWrapper',
      identify: function(reactWrapper) {
        return reactWrapper && reactWrapper instanceof ReactWrapper;
      },
      inspect: function(reactWrapper, depth, output, inspect) {
        if (!reactWrapper.exists()) {
          return output.jsKeyword('null');
        }

        const startTag = output.clone();
        startTag.text('<');
        startTag.jsKeyword(reactWrapper.name());

        const props = reactWrapper.props();
        Object.keys(props).forEach(key => {
          if (key === 'children') {
            return;
          }

          startTag.sp().text(`${key}`);

          const value = props[key];
          const valueType = typeof value;
          switch (valueType) {
            case 'string':
              startTag
                .text('=')
                .jsString('"')
                .jsString(value)
                .jsString('"');
              break;
            case 'boolean':
              if (!value) {
                startTag
                  .text('={')
                  .jsPrimitive(value)
                  .text('}');
              }
              break;
            default:
              startTag
                .text('={')
                .appendInspected(value)
                .text('}');
          }
        });

        const children = reactWrapper.children();
        const hasStringChild = typeof props.children === 'string';

        if (children.length === 0 && !props.children) {
          startTag.text(' />');
          output.append(startTag);
        } else {
          startTag.text('>');

          const endTag = output
            .clone()
            .text('</')
            .jsKeyword(reactWrapper.name())
            .text('>');

          const hasTextChild =
            children.length === 0 && props.children.length > 0;

          const inspectedChildren = hasTextChild
            ? [output.clone().text(reactWrapper.text())]
            : children.map(child => inspect(child));

          const maxLineLength = Math.min(output.preferredWidth, 60);

          let width = startTag.size().width + endTag.size().width;
          const compact =
            inspectedChildren.length > 5 ||
            inspectedChildren.every(inspectedChild => {
              if (inspectedChild.isMultiline()) {
                return false;
              }
              width += inspectedChild.size().width;
              return width < maxLineLength;
            });

          const childrensOutput = output.clone();
          inspectedChildren.forEach((inspectedChild, index) => {
            if (!compact && index > 0) {
              childrensOutput.nl();
            }
            childrensOutput.append(inspectedChild);
          });

          output.append(startTag);

          if (compact) {
            output.append(childrensOutput);
          } else {
            output.indentLines().nl();
            output.indent().block(output => output.append(childrensOutput));
            output.outdentLines().nl();
          }

          output.append(endTag);
        }
      }
    });

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to be checked',
      (expect, reactWrapper) => {
        expect(reactWrapper.instance().checked, '[not] to be true');
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to have type <string|function>',
      (expect, reactWrapper, type) => {
        if (typeof type === 'function') {
          expect.argsOutput[0] = output =>
            output.text((type && type.displayName) || type.name || type);
        }

        expect(reactWrapper.type(), '[not] to equal', type);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to render text satisfying <assertion>',
      (expect, reactWrapper) => {
        expect.errorMode = 'nested';

        return expect.shift(reactWrapper.text());
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to render text <string>',
      (expect, reactWrapper, text) => {
        expect(reactWrapper.text(), '[not] to equal', text);
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
      '<ReactWrapper> to have state satisfying <object|null>',
      (expect, reactWrapper, state) => {
        return expect(reactWrapper.state(), 'to satisfy', state);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to have state satisfying <assertion>',
      (expect, reactWrapper) => {
        return expect.shift(reactWrapper.state());
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to have context satisfying <object>',
      (expect, reactWrapper, context) => {
        return expect(reactWrapper.context(), 'to satisfy', context);
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to contain <string>',
      (expect, reactWrapper, selector) => {
        return expect(
          reactWrapper.find(selector).exists(),
          '[not] to be',
          true
        );
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
      '<ReactWrapper> queried for <string> <assertion>',
      (expect, reactWrapper, query) => {
        return expect.shift(reactWrapper.find(query));
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> to render as <ReactElement>',
      (expect, reactWrapper, reactElement) => {
        return expect(
          reactWrapper.getElement(),
          'to have rendered',
          reactElement
        );
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> [not] to exist',
      (expect, reactWrapper) => {
        const exists = reactWrapper.exists();
        if (expect.flags.not && exists) {
          expect.fail();
        } else if (expect.flags.not === exists) {
          expect.errorMode = 'bubble';
          expect.fail(output =>
            output
              .error('Element did not exist in:')
              .nl(2)
              .appendInspected(reactWrapper.root())
          );
        }
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> when setting props <object> <assertion>',
      (expect, reactWrapper, props) => {
        return expect.shift(reactWrapper.setProps(props));
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> when setting state <object> <assertion>',
      (expect, reactWrapper, props) => {
        return expect.shift(reactWrapper.setState(props));
      }
    );

    childExpect.exportAssertion(
      '<ReactWrapper> when setting context <object> <assertion>',
      (expect, reactWrapper, props) => {
        return expect.shift(reactWrapper.setContext(props));
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
        const reactElement = reactWrapper.getDOMNode();
        const actualClasses = reactElement.className.split(' ');

        expect(actualClasses, '[not] to contain', ...className.split(' '));
      }
    );
  }
};

unexpectedEnzyme.clearAll = unexpectedReact.clearAll;

module.exports = unexpectedEnzyme;
