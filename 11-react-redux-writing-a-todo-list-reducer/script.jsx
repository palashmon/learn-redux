/*
 * Open the console to see
 * that all tests have passed.
 */

const todos = (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};

const testEmptyActionType = () => {
  const stateBefore = [];
  const action = {};
  const stateAfter = [];
  deepFreeze(stateBefore);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testEmptyAction = () => {
  const stateBefore = [];
  const action = undefined;
  const stateAfter = [];
  deepFreeze(stateBefore);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testEmptyActionType();
testEmptyAction();
testAddTodo();

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
