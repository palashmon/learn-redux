/*
 * Writing a Todo List Reducer (Toggling a Todo)
 *
 * Open the console to see
 * that all tests have passed.
 */

/**
 * Reducer Composition with Arrays
 * @param {object} state
 * @param {object} action
 * @returns A todo object
 */
const todo = (state, action = {}) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      return state.id !== action.id ? state : { ...state, completed: !state.completed };
    default:
      return state;
  }
};

/**
 * Todos Reducer
 * @param {array} state
 * @param {object} action
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);
const { Component } = React;

/**
 * View Layer Code
 */
let nextTodoId = 1;
class TodoApp extends Component {
  handleAddTodo = () => {
    store.dispatch({
      type: 'ADD_TODO',
      text: this.input.value,
      id: nextTodoId++
    });
    this.input.value = '';
  };

  render() {
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <ul>{this.props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('root'));
};

store.subscribe(render);
render();
