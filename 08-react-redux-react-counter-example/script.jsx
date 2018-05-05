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

// Simple stateless Counter component
const style = { width: 80 };
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div className="page-header">
    <h1>{value}</h1>
    <button onClick={onIncrement} className="btn btn-sm btn-info" style={style}>
      +
    </button>
    <button onClick={onDecrement} className="btn btn-sm ml-2 btn-info" style={style}>
      -
    </button>
  </div>
);

// Get the createStore from Redux
const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
