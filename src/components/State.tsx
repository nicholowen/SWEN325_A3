import React, { createContext, useReducer } from "react";

let AppContext = createContext({});

const initialState = {
  count: 0,
};

type state = {
  count: number;
};
type dispatch = {
  count: number;
};
type action = {
  type: any;
  count: number;
};

let reducer = (state: any, action: action) => {
  switch (action.type) {
    case "setCount": {
      return { ...state, count: action.count };
    }
  }
  return state;
};

function AppContextProvider(props: any) {
  const fullInitialState = {
    ...initialState,
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch: dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };

//************************************ CURRENTLY UNUSED **************************************/
//TODO DELETE WHEN COMPLETE
