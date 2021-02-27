const INITIAL_STATE = {
  data: {},
};

function graph(state=INITIAL_STATE, action) {
  if ("GRAPH_SET_DATA" === action.type) {
      let data = action.data

      for (let dataset of data.datasets){
        dataset.backgroundColor = "rgba(118, 50, 219, 0.0)";
        dataset.borderColor = "rgba(118, 50, 219, 0.7)";
      }
      state.data = data;
  }

  return state;
}

export default graph;
