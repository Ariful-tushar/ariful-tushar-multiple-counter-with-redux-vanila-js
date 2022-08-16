// Funcation  for Creating a Counder
const createCounterHtml = (id, value) => {
  return `        <div
        class="flex flex-col justify-center items-center bg-white rounded p-5 space-y-5" id = ${id}
        >
        <h3 class="text-center mx-auto text-2xl">${value}</h3>
        <div class="flex space-x-3">
          <button
            class="flex-wrap m-4 bg-indigo-400 text-white px-3 py-2 rounded shadow" id = "increment"
          >
            Increment
          </button>
          <button
            class="flex-wrap m-4 bg-rose-400 text-white px-3 py-2 rounded shadow" id ="decrement"
          >
            Decrement
          </button>
        </div>
        </div>`;
};

// Dom Element for Counter Container
const counterContainerEl = document.getElementById("counterContainer");

// Initial State
const initialState = [
  {
    id: 1,
    data: createCounterHtml(1, 0),
    value: 0,
  },
];

// create increment action creator
const increment = (id, value) => {
  return {
    id: id,
    type: "increment",
    value: value,
  };
};

// create decrement action creator
const decrement = (id, value) => {
  return {
    id: id,
    type: "decrement",
    value: value,
  };
};

// Create Add Counter Action Creator
const addCounter = () => {
  return {
    type: "addCounter",
  };
};

// Create Reset Counter
const reset = () => {
  return {
    type: "reset",
  };
};

// Reduceer Function
const reducerCounter = (state = initialState, action) => {
  if (action.type === "increment") {
    const copiedState = state.map((s) => ({
      ...s,
    }));
    state.forEach((stateObject) => {
      if (stateObject.id.toString() === action.id.toString()) {
        const index = copiedState.findIndex(
          (s) => s.id.toString() === action.id.toString()
        );

        copiedState[index].value = copiedState[index].value + action.value;
        copiedState[index].data = createCounterHtml(
          action.id,
          copiedState[index].value
        );
      }
    });
    return copiedState;
  } else if (action.type === "decrement") {
    const copiedState = state.map((s) => ({
      ...s,
    }));
    state.forEach((stateObject) => {
      if (stateObject.id.toString() === action.id.toString()) {
        const index = copiedState.findIndex(
          (s) => s.id.toString() === action.id.toString()
        );

        copiedState[index].value = copiedState[index].value - action.value;
        copiedState[index].data = createCounterHtml(
          action.id,
          copiedState[index].value
        );
      }
    });
    return copiedState;
  } else if (action.type === "addCounter") {
    randomId = Math.floor(Math.random() * 100);
    return [
      ...state,
      {
        id: randomId,
        data: createCounterHtml(randomId, 0),
        value: 0,
      },
    ];
  } else if (action.type === "reset") {
    const copiedState = state.map((s) => ({ ...s }));

    return copiedState.map((stateObject) => {
      return {
        ...stateObject,
        value: 0,
        data: createCounterHtml(stateObject.id, 0),
      };
    });
  } else {
    return state;
  }
};

// Create Store
const store = Redux.createStore(reducerCounter);

// Render Function
const render = () => {
  const state = store.getState();

  counterContainerEl.innerHTML = state.map((s) => s.data).join("");
};

// Render First Time
render();
store.subscribe(render);

// Event Listeners
document.addEventListener("click", (e) => {
  parentId = e.target.parentElement.parentElement.id;

  if (e.target.id === "increment") {
    store.dispatch(increment(parentId, 1));
  } else if (e.target.id === "decrement") {
    store.dispatch(decrement(parentId, 1));
  } else if (e.target.id === "addCounter") {
    store.dispatch(addCounter());
  } else if (e.target.id === "reset") {
    store.dispatch(reset());
  }
});
