const INITIAL_STATE = {
  graph: {},
  firstDatetime: "",
  shopNamesOptions: [],
  nLinesOptions: [],
};

function graph(state = INITIAL_STATE, action) {
  if ("GRAPH_SET_DATA" === action.type) {
    let data = action.data;

    for (let dataset of data.graph.datasets) {
      dataset.backgroundColor = "rgba(118, 50, 219, 0.0)";
      dataset.borderColor = "rgba(118, 50, 219, 0.7)";
      dataset.pointBackgroundColor = "rgba(118, 50, 219, 0.7)";
    }

    state.graph = data.graph;
    state.firstDatetime = data.firstDatetime;
  }

  if ("GRAPH_SET_OPTIONS" === action.type) {
    const data = action.data;
    state.shopNamesOptions = [];

    for (let device of data.devices) {
      const shopOption = { lable: device.shop_name, id: device.id };
      state.shopNamesOptions = [...state.shopNamesOptions, shopOption];
    }

    state.nLinesOptions = [
      { lable: "5", nLines: 5 },
      { lable: "10", nLines: 10 },
      { lable: "25", nLines: 25 },
      { lable: "50", nLines: 50 },
    ];
  }

  return state;
}

export default graph;
