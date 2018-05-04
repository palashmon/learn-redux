/*Creating an counter reducer function*/
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

// Get the createStore from Redux
const { createStore } = Redux;

// Specify reducer
const store = createStore(counter);

const render = () => {
  const currentState = store.getState();
  displayInPreview(currentState);
  console.log(currentState);
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
  console.log('Action: INCREMENT');
});

// Display in app preview
function displayInPreview(string = 'Hello World!') {
  document.getElementById('header').innerHTML = string;
}
