/*
 * Open the console tab
 * to see that the tests pass.
 */

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const init = () => {
  try {
    expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

    expect(counter(1, { type: 'INCREMENT' })).toEqual(2);

    expect(counter(2, { type: 'DECREMENT' })).toEqual(1);

    expect(counter(1, { type: 'DECREMENT' })).toEqual(0);

    // When action is not defined inside reducer
    expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1);

    // When initial state is not defined
    expect(counter(undefined, {})).toEqual(0);

    const styles = 'font-weight: bold; font-size:22px; color: green';
    console.log('%c Tests passed!', styles) || displayInPreview('Tests passed!');

    // Display in app preview
    function displayInPreview(string) {
      var newDiv = document.createElement('div');
      var newContent = document.createTextNode(string);
      newDiv.appendChild(newContent);
      document.body.appendChild(newDiv);
    }
  } catch (ex) {
    console.group('%c Error Details', 'font-weight: bold; font-size:22px; color: #fb2057');
    console.error(ex);
    console.groupEnd();
  }
};

init();
