/*
 * Open the console to see
 * that all tests have passed.
 */

const toggleTodo = todo => {
  return {
    ...todo,
    completed: !todo.completed
  };
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();

const styles = 'font-weight: bold; font-size:22px; color: green';
console.log('%c All tests passed.', styles) || displayInPreview('All tests passed.');

// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement('div');
  var newContent = document.createTextNode(string);
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
}

// Function exported from deep-freeze lib
function deepFreeze(o) {
  if (o === Object(o)) {
    Object.isFrozen(o) || Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function(prop) {
      prop === 'constructor' || deepFreeze(o[prop]);
    });
  }
  return o;
}
