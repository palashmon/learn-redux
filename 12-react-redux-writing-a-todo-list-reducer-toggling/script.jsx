/*
 * Writing a Todo List Reducer (Toggling a Todo)
 *
 * Open the console to see
 * that all tests have passed.
 */

/**
 * Todo Reducer
 * @param {array} state
 * @param {object} action
 */
const todos = (state = [], action) => {
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
    case 'TOGGLE_TODO':
      return state.map(todo => (todo.id !== action.id ? todo : { ...todo, completed: !todo.completed }));
    default:
      return state;
  }
};

/**
 * Main functions
 */

// Function exported from deep-freeze lib
function deepFreeze(o) {
  if (o === Object(o)) {
    Object.getOwnPropertyNames(o).forEach(prop => prop === 'constructor' || deepFreeze(o[prop]));
  }
  return o;
}

// display in plunker preview
function displayInPreview(string) {
  const newDiv = document.createElement('div');
  const newContent = document.createTextNode(string);
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
}

/**
 * TESTS
 */
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

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();

// Display if all tests are passed
const styles = 'font-weight: bold; font-size:22px; color: green';
console.log('%c All tests passed.', styles) || displayInPreview('All tests passed.');
