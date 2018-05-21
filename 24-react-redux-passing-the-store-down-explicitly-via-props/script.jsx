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

const TodoHeader = () => (
  <header>
    <h3>React-Redux Todo List</h3>
    <hr />
  </header>
);

const Footer = ({ store }) => (
  <p>
    Show:{' '}
    <FilterLink filter="SHOW_ALL" store={store}>
      All
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE" store={store}>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED" store={store}>
      Completed
    </FilterLink>
  </p>
);

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

//#endregion

//#region Container Components

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

//#endregion

//#region View Layer

/**
 * View Layer Code
 */
let nextTodoId = 1;
const AddTodo = ({ store }) => {
  let input;
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-5">
          <input
            className="form-control input-sm"
            ref={node => {
              input = node;
            }}
          />
        </div>
        <div className="col-md-7">
          <button
            className="btn btn-info ml-2"
            onClick={() => {
              store.dispatch({
                type: 'ADD_TODO',
                id: nextTodoId++,
                text: input.value
              });
              input.value = '';
            }}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
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

const TodoApp = ({ store }) => (
  <div className="p-5">
    <TodoHeader />
    <div className="row p-2">
      <AddTodo store={store} />
      <div className="col-md-12 mt-4">
        <VisibleTodoList store={store} />
        <Footer store={store} />
      </div>
    </div>
  </div>
);

//#endregion

//#region React Render

const { createStore } = Redux;
ReactDOM.render(<TodoApp store={createStore(todoApp)} />, document.getElementById('root'));

//#endregion
