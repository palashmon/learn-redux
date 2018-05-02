//REDUX STORE

/*Creating an counter reducer function*/
var counter = (state = 0, action = {}) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

/*
Redux Store:
It holds the current application state object
It lets you to dispatch actions
When you created it helps to specify reducer to update state with action.
*/

const { createStore } = Redux;
const store = createStore(counter); //specify reducer

//Redux store has 3 methods:
//1. getState //gets current state of the Redux store.
console.log(store.getState());

//2. dispatch //lets you to dispatch action.
console.log(store.dispatch({ type: 'INCREMENT' }));
console.log(store.getState());

//3. subscribe
//let u register a call back which will be called anytime an action is dispatched.
store.subscribe(() => {
  document.body.innerText = store.getState();
  console.log(store.getState());
});

document.addEventListener('click', () => {
  console.log(store.getState());
  store.dispatch({ type: 'INCREMENT' });
});
