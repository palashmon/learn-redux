/*
 * Writing a Todo List Reducer (Toggling a Todo)
 *
 * Open the console to see
 * that all tests have passed.
 */

//#region Reducers

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

//#endregion

//#region React Redux Store

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);
const { Component } = React;

//#endregion

//#region Presentational Components
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}</ul>
);

const TodoAddButton = ({ onClick }) => (
  <button className="btn btn-info ml-2" onClick={onClick}>
    Add Todo
  </button>
);

const TodoHeader = () => (
  <header>
    <h3>React-Redux Todo List</h3>
    <hr />
  </header>
);

//#endregion

//#region View Layer

/**
 * View Layer Code
 */
const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (todos = [], filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

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
    // Get the props values here
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
      <div className="p-5">
        <TodoHeader />
        <div className="row p-2">
          <div className="col-md-5">
            <input
              className="form-control input-sm"
              onKeyPress={this.handleKeyPress}
              ref={node => {
                this.input = node;
              }}
            />
          </div>
          <div className="col-md-7">
            <button className="btn btn-info ml-2" onClick={this.handleAddTodo}>
              Add Todo
            </button>
          </div>
          <div className="col-md-12 mt-4">
            <TodoList
              todos={visibleTodos}
              onTodoClick={id =>
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id
                })
              }
            />
            <p>
              Show:{' '}
              <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
                All
              </FilterLink>
              {', '}
              <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
                Active
              </FilterLink>
              {', '}
              <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
                Completed
              </FilterLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

//#endregion

//#region React Render

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
};

store.subscribe(render);
render();

//#endregion
