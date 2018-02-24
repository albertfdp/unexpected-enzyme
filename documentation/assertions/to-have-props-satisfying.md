Asserts that the given wrapper has props matching a given specification.

```js
const User = ({ index }) => <span>User {index}</span>;

const Fixture = () => (
  <div>
    <ul>
      <li><User index={1} /></li>
      <li><User index={2} /></li>
    </ul>
  </div>
);

const wrapper = mount(<Fixture />);

expect(wrapper.find(User).first(), 'to have props satisfying', {
 index: 1
});
```
