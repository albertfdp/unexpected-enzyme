import unexpected from 'unexpected';
import unexpectedEnzyme from '../src';
import unexpectedSinon from 'unexpected-sinon';

export default unexpected
  .clone()
  .use(unexpectedSinon)
  .use(unexpectedEnzyme)
  .addAssertion('<any> to inspect as <string>', (expect, subject, value) => {
    expect(expect.inspect(subject).toString(), 'to equal', value);
  });
