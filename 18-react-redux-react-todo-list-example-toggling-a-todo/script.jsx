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
  componentDidMount() {
    this.input.focus();
  }

  handleAddTodo = () => {
    store.dispatch({
      type: 'ADD_TODO',
      text: this.input.value,
      id: nextTodoId++
    });
    this.input.value = '';
    this.input.focus();
  };

  handleKeyPress = e => {
    // If only enter key was pressed the add the todo
    if (e.key === 'Enter') {
      this.handleAddTodo();
    }
  };

  handleTodoClick = item => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: item.id
    });
  };

  render() {
    return (
      <div className="p-5">
        <h3>React-Redux Todo List</h3>
        <hr />
        <div className="row p-2">
          <div className="col-md-4">
            <input
              className="form-control input-sm"
              onKeyPress={this.handleKeyPress}
              ref={node => {
                this.input = node;
              }}
            />
          </div>
          <div className="col-md-8">
            <button className="btn btn-info ml-2" onClick={this.handleAddTodo}>
              Add Todo
            </button>
          </div>
          <div className="col-md-12 mt-4">
            <ul>
              {this.props.todos.map(todo => (
                <li
                  key={todo.id}
                  onClick={this.handleTodoClick.bind(this, todo)}
                  className={todo.completed ? 'text-muted' : null}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {todo.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('root'));
};

store.subscribe(render);
render();
