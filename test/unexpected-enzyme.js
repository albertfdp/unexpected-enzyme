import unexpected from 'unexpected';
import unexpectedEnzyme from '../src';

import unexpectedSinon from 'unexpected-sinon';

const jestExpect = global.expect;

unexpected.output.preferredWidth = 80;

export default unexpected
  .clone()
  .use(unexpectedSinon)
  .use(unexpectedEnzyme)
  .addAssertion('<any> to inspect as <string>', (expect, subject, value) => {
    expect(expect.inspect(subject).toString(), 'to equal', value);
  })
  .addAssertion('<any> to match snapshot', (expect, subject) => {
    jestExpect(subject).toMatchSnapshot();
  })
  .addAssertion(
    '<function> with error matching snapshot',
    (expect, subject) => {
      return expect.promise(() => subject()).then(
        () => expect.fail(),
        error => {
          if (error && error._isUnexpected) {
            expect(
              error.getErrorMessage('text').toString(),
              'to match snapshot'
            );
          } else {
            expect(error.message, 'to match snapshot');
          }
        }
      );
    }
  );
