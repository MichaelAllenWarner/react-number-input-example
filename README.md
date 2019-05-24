# Restricting User Input on a "Number"-Type Input Box in React

Unexpected behavior (a bug?) in React occurs when trying to manually impose user-input restrictions on input boxes with the `type="number"` attribute. The code in question looks like this (I’m using a [Babel plugin](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) that allows for class properties):

```javascript
export class BadInput extends Component {
  state = {
    value: ''
  };

  handleInput = event => {
    const inputIsGood = (
      Number.isInteger(+event.target.value)
      && +event.target.value >= 1
      && +event.target.value <= 9
    );

    if (inputIsGood) {
      this.setState({ value: (+event.target.value).toString() });
    } else {
      this.setState({ value: '' }); // string is EMPTY
    }
  };

  render() {
    return (
      <input
        type="number"
        min="1"
        max="9"
        value={this.state.value}
        onInput={this.handleInput}
      />
    );
  }
}
```

 This is a basic [controlled component](https://reactjs.org/docs/forms.html#controlled-components). As the user types, React checks whether the input evaluates to an integer between 1 and 9. If it does, the input box re-renders with its value set to a string of that integer. If it doesn’t, then the input box *should* re-render blank, as we’re setting its value to an empty string. But it doesn’t work! On Firefox and Safari, *anything* can be typed in the box. On Chrome, most non&ndash;1-9 characters cannot be typed, but at least `e`, `E`, `+`, `-`, and `.` can be.

The fix is to change `this.setState({ value: '' })` to something like `this.setState({ value: ' ' })`. That string is a single space, but actually *any* non-empty string will do if it doesn’t evaluate to an integer between 1 and 9; and if it *does* evaluate to an integer between 1 and 9 (e.g., if the string is '1'), then that integer is what shows up in the box after a “bad” input.

I don’t fully understand this behavior or why the fix works. Notably, the problem disappears if I get rid of the `type="number"` attribute (but this isn’t a proper fix like mine is, since without `type="number` mobile users will see an alphabetic virtual keyboard rather than a numeric one). So maybe React is running its own kind of validation test behind the scenes? That might explain some of the behavior, but why does an *empty* string present a problem? After all, `+''` and `+' '` both evaluate to `0` in JavaScript (and `+'letters'` evaluates to `NaN`!).

I’m hosting an example on GitHub Pages [here](https://michaelallenwarner.github.io/react-number-input-example/public/index.html). One input box allows non&ndash;1-9 characters (again, browsers differ as to which ones), and the other doesn’t. The only difference between them is what I’ve described above&mdash;one is “supposed” to clear to an empty string after a bad input (but doesn’t), and the other is “supposed” to convert a bad input into a single space (but it actually clears the box of all characters).

Finally, I’ll note that “equivalent” code in vanilla JS does *not* reproduce this problem:

```javascript
const inputBox = document.querySelector('#input-box');

inputBox.addEventListener('input', handleInput);

function handleInput(event) {
  const inputIsGood = (
    Number.isInteger(+event.target.value)
    && +event.target.value >= 1
    && +event.target.value <= 9
  );

  if (inputIsGood) {
    event.target.value = (+event.target.value).toString();
  } else {
    event.target.value = '';
  }
}
```

That’s an empty string at the end, and this code works exactly as expected: it clears the box on a bad input (you can see it in action [here](https://michaelallenwarner.github.io/react-number-input-example/public/vanilla.html)). So I’m confident that the issue is related to React.

Whatever the cause, it’s good to be aware of (and to have a fix!). Check out my [React Sudoku Solver](https://github.com/MichaelAllenWarner/react-sudoku-solver) to see the fix put to good use.