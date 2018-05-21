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

// const { Component } = React;
const { connect } = ReactRedux;
const { PropTypes } = PropTypes;

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

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
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

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
};
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

//#region Generating Containers with connect() from React Redux

const mapStateToTodoListProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
const mapDispatchToTodoListProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      });
    }
  };
};
const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

//#endregion

//#endregion

//#region View Layer

/**
 * View Layer Code
 */
let nextTodoId = 1;
let AddTodo = ({ dispatch }) => {
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
              dispatch({
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
AddTodo = connect()(AddTodo);

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

const TodoApp = () => (
  <div className="p-5">
    <TodoHeader />
    <div className="row p-2">
      <AddTodo />
      <div className="col-md-12 mt-4">
        <VisibleTodoList />
        <Footer />
      </div>
    </div>
  </div>
);

//#endregion

//#region React Render

const { Provider } = ReactRedux;
const { createStore } = Redux;
ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

//#endregion
